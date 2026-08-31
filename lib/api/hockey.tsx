import type { NhlStandingsResponse } from "./types";

const API_URL = "https://hockey-highlights-api.p.rapidapi.com/standings?leagueId=49291&season=2025";

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