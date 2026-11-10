import { describe, it, expect, vi, afterEach } from "vitest";
import { getNhlMatches, getNhlStandings } from "../lib/api/hockey";

const mockStandings = {
    groups: [
        {
            name: "Western Conference",
            standings: [
                {
                    team: {
                        id: 585421,
                        name: "Minnesota Wild",
                        logo: null,
                    },
                    wins: 12,
                    loses: 3,
                    position: 1,
                    gamesPlayed: 19,
                    scoredGoals: 63,
                    winsOvertime: 0,
                    losesOvertime: 4,
                    receivedGoals: 43,
                },
            ],
        },
    ],
};

const mockMatches = {
    data: [
        {
            id: 123,
            date: "2026-11-09T20:00:00Z",
            state: {
                clock: null,
                score: {
                    current: null,
                    overTime: null,
                    penalties: null,
                },
                description: "Not started",
            },
            awayTeam: {
                id: 1,
                name: "Boston Bruins",
                logo: null,
            },
            homeTeam: {
                id: 2,
                name: "Toronto Maple Leafs",
                logo: null,
            },
        },
    ],
};

function mockFetchResponse(
    body: unknown,
    status = 200,
    statusText = "",
) {
    return vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
        return new Response(
            body === null ? null : JSON.stringify(body),
            {
                status,
                statusText,
                headers: { "Content-Type": "application/json" },
            },
        );
    });
}

afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    vi.unstubAllEnvs();
});

describe("getNhlStandings", () => {
    it("returns standings upon successful API request", async () => {
        mockFetchResponse(mockStandings);

        const result = await getNhlStandings();

        expect(result).toEqual(mockStandings);
        expect(fetch).toHaveBeenCalledOnce();
    });

    it("throws error upon failed API request", async () => {
        mockFetchResponse(null, 500, "Internal Server Error");

        await expect(getNhlStandings()).rejects.toThrow(
            "Hockey API error: 500 Internal Server Error",
        );
    });

    it("calls the API with correct URL and headers", async() => {
        const fetchMock = mockFetchResponse(mockStandings);

        await getNhlStandings();

        expect(fetchMock).toHaveBeenCalledWith(
            "https://hockey-highlights-api.p.rapidapi.com/standings?leagueId=49291&season=2026",
            expect.objectContaining({
                method: "GET",
                headers: expect.objectContaining({
                    "x-rapidapi-host": "hockey-highlights-api.p.rapidapi.com",
                    "Content-Type": "application/json",
                }),
                next: { revalidate: 900},
            }),
        );
    });
});

describe("getNhlMatches", () => {
    it("returns matches from all 3 API requests", async () => {
        mockFetchResponse(mockMatches);

        const result = await getNhlMatches();

        expect(result).toHaveLength(3);
        expect(result).toEqual([
            ...mockMatches.data,
            ...mockMatches.data,
            ...mockMatches.data,
        ]);
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    it("fetches matches for yesterday, today and tomorrow", async () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-11-10T12:00:00.000Z"));

        mockFetchResponse(mockMatches);

        await getNhlMatches();

        const requestedDates = vi.mocked(fetch).mock.calls.map(([url]) => {
            return new URL(String(url)).searchParams.get("date");
        });

        expect(requestedDates).toEqual([
            "2026-11-09",
            "2026-11-10",
            "2026-11-11",
        ]);

        vi.useRealTimers();
    });

    it("sends correct parameters to API", async () => {
        mockFetchResponse(mockMatches);

        await getNhlMatches();

        const requestedUrls = vi.mocked(fetch).mock.calls.map(([url]) => {
            return new URL(String(url));
        });

        requestedUrls.forEach((url) => {
            expect(url.searchParams.get("leagueName")).toBe("NHL");
            expect(url.searchParams.get("timezone")).toBe("Europe/Stockholm");
            expect(url.searchParams.get("limit")).toBe("100");
        });
    });

    it("sends correct headers to API", async () => {
        vi.stubEnv("RAPIDAPI_KEY", "test-api-key");

        mockFetchResponse(mockMatches);

        await getNhlMatches();

        const fetchCalls = vi.mocked(fetch).mock.calls;

        fetchCalls.forEach(([, options]) => {
            expect(options?.method).toBe("GET");
            expect(options?.headers).toEqual({
                "x-rapidapi-key": "test-api-key",
                "x-rapidapi-host": "hockey-highlights-api.p.rapidapi.com",
                "Content-Type": "application/json",
            });
        });
    });

    it("throws error upon failed API request", async () => {
        mockFetchResponse(null, 500, "Internal Server Error");

        await expect(getNhlMatches()).rejects.toThrow(
            "Hockey API error: 500"
        );

        expect(fetch).toHaveBeenCalledTimes(3);
    });

    it("returns an empty array when API returns no matches", async () => {
        mockFetchResponse({ data: [] });

        const result = await getNhlMatches();

        expect(result).toEqual([]);
    });
});