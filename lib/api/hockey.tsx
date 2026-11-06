import type { NhlStandingsResponse } from "./types";
import type { Match, MatchesResponse } from "./types";

const API_URL = "https://hockey-highlights-api.p.rapidapi.com/standings?leagueId=49291&season=2026";

export async function getNhlStandings(): Promise<NhlStandingsResponse> {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
            "x-rapidapi-host": "hockey-highlights-api.p.rapidapi.com",
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            `Hockey API error: ${response.status} ${response.statusText}`,
        );
    }

    return response.json();
}

export async function getNhlMatches(): Promise<Match[]> {
    const today = new Date();

    const dates = Array.from({ length: 3}, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index - 1);

        return date.toLocaleDateString("sv-SE", {
            timeZone: "Europe/Stockholm",
        });
    });

    const responses = await Promise.all(
        dates.map(async (date) => {
            const params = new URLSearchParams({
                leagueName: "NHL",
                date,
                timezone: "Europe/Stockholm",
                limit: "100",
            });
        

            const response = await fetch(
                `https://hockey-highlights-api.p.rapidapi.com/matches?${params.toString()}`,
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
                        "x-rapidapi-host": "hockey-highlights-api.p.rapidapi.com",
                        "Content-Type": "application/json",

                    },
                },
            );

            if (!response.ok) {
                throw new Error(`Hockey API error: ${response.status}`);
            }

            const result: MatchesResponse = await response.json();
            return result.data;
        }),
    );
    return responses.flat();
}