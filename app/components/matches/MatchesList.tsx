"use client"

import { Match } from "@/lib/api/types";
import { useState } from "react";


type MatchesListProps = {
    matches: Match[];
};

function getDateLabel(date: string) {
    const today = new Date().toLocaleDateString("sv-SE", {
      timeZone: "Europe/Stockholm",
    });
  
    const [year, month, day] = today.split("-").map(Number);
  
    const todayDate = new Date(Date.UTC(year, month - 1, day));
  
    const yesterday = new Date(todayDate);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  
    const tomorrow = new Date(todayDate);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  
    const formatDate = (value: Date) =>
      value.toISOString().slice(0, 10);
  
    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString(
      "sv-SE",
      {
        day: "numeric",
        month: "long",
        timeZone: "Europe/Stockholm",
      },
    );
  
    if (date === formatDate(yesterday)) {
      return `Igår – ${formattedDate}`;
    }
  
    if (date === today) {
      return `Idag – ${formattedDate}`;
    }
  
    if (date === formatDate(tomorrow)) {
      return `Imorgon – ${formattedDate}`;
    }
  
    return formattedDate;
  }

  function getMatchStatus(match: Match) {
    const status = match.state.description;

    const finishedStatuses = [
        "Finished",
        "Finished after over time",
        "Finished after penalties"
    ];

    if (finishedStatuses.includes(status)) {
        return "finished";
    }

    if (status === "Not started") {
        return "upcoming";
    }

    return "Live";
  }

export default function MatchesList({ matches }: MatchesListProps) {
    const [revealedMatches, setRevealedMatches] = useState<number[]>([]);

    function toggleReveal(matchId: number) {
        setRevealedMatches((current) =>
            current.includes(matchId)
            ? current.filter((id) => id !== matchId)
            : [...current, matchId],
        );
    }

    const groupedMatches: Record<string, Match[]> = {};

    matches.forEach((match) => {
    const date = new Date(match.date).toLocaleDateString("sv-SE", {
        timeZone: "Europe/Stockholm",
    });

    if (!groupedMatches[date]) {
        groupedMatches[date] = [];
    }

    groupedMatches[date].push(match);
    });
    Object.values(groupedMatches).forEach((dayMatches) => {
        dayMatches.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
    });

    return(
        <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-white">NHL Matcher</h2>

            <div className="space-y-6">
                {Object.entries(groupedMatches).map(([date, dayMatches]) => (
                    <div key={date}>
                        <h3 className="mb-3 text-lg font-semibold text-white">
                            {getDateLabel(date)}
                        </h3>

                        <div className="space-y-3">
                            {dayMatches.map((match) => {
                                const isRevealed = revealedMatches.includes(match.id);
                                const status = getMatchStatus(match);

                                return (
                                    <div
                                        key={match.id}
                                        className="rounded-lg border border-gray-700 bg-gray-800 p-4"
                                    >
                                        <div className="grid grid-cols-3 items-center gap-2">

                                            <div className="flex items-center justify-end gap-2">
                                                    {match.homeTeam.logo && (
                                                        <img 
                                                            src={match.homeTeam.logo}
                                                            alt=""
                                                            className="h-8 w-8 object-contain"
                                                        />
                                                    )}
                                                    <span className="text-white">{match.homeTeam.name}</span>
                                                </div>
                                            

                                            <span className="text-center text-gray-400">vs</span>

                                            <div className="flex items-center justify-start gap-2">
                                                {match.awayTeam.logo && (
                                                    <img
                                                        src={match.awayTeam.logo}
                                                        alt=""
                                                        className="h-8 w-8 object-contain"
                                                    />
                                                )}
                                                <span className="text-white">{match.awayTeam.name}</span>
                                            </div>
                                        </div>

                                        <p className="mt-3 text-center text-sm text-gray-400">
                                            {new Date(match.date).toLocaleString("sv-SE", {
                                                timeZone: "Europe/Stockholm",
                                                dateStyle: "short",
                                                timeStyle: "short",
                                            })}
                                        </p>
                                        {(status === "finished" || status === "Live") && (
                                            <div className="mt-3 text-center">
                                                {isRevealed && (
                                                    <p className="text-white">
                                                        {match.state.score.current}
                                                    </p>
                                                )}

                                                <button
                                                    onClick={() => toggleReveal(match.id)}
                                                    className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                                                >
                                                    {isRevealed
                                                        ? "Dölj resultat"
                                                        : status === "finished"
                                                        ? "Visa resultat"
                                                        : "Visa aktuell ställning"}
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}