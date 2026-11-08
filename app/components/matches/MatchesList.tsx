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
                                const scoreParts = match.state.score.current?.split(" - ") ?? [];
                                const homeScore = scoreParts[0] ?? "-";
                                const awayScore = scoreParts[1] ?? "-";

                                return (
                                    <div
                                        key={match.id}
                                        className="rounded-xl border border-slate-700/70 bg-slate-800/80 px-4 py-3"
                                    >
                                        <div className="relative mb-5 flex items-center justify-center">
                                            {/* Status */}
                                            <div className="absolute left-0">
                                                <span 
                                                    className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${
                                                        status === "finished"
                                                            ? "border-slate-600 bg-slate-700/50 text-slate-300"
                                                            : status === "Live"
                                                            ? "border-rose-500/30 bg-rose-600/30 text-gray-300"
                                                            : "border-blue-500/30 bg-blue-500/10 text-blue-300"
                                                    }`}
                                                >
                                                    {status === "Live" && (
                                                        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-rose-400" />
                                                    )}

                                                    {status === "finished"
                                                        ? "SLUTSPELAD"
                                                        :   status === "Live"
                                                        ? "LIVE"
                                                        : "KOMMANDE"}
                                                </span>
                                            </div>

                                            {/* Date and time */}
                                            <p className="text-center text-sm text-slate-400">
                                                {new Date(match.date).toLocaleString("sv-SE", {
                                                    timeZone: "Europe/Stockholm",
                                                    dateStyle: "short",
                                                })}
                                                {" - "}
                                                {new Date(match.date).toLocaleTimeString("sv-SE", {
                                                    timeZone: "Europe/Stockholm",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>

                                        
                                        {/* Home Team */}
                                        <div className="grid grid-cols-[1fr_32px_32px_1fr] items-center gap-6">

                                            <div className="flex min-w-0 items-center justify-start gap-2">

                                                <span className="truncate text-white">
                                                        {match.homeTeam.name}
                                                </span>
                                                {match.homeTeam.logo && (
                                                    <img 
                                                        src={match.homeTeam.logo}
                                                        alt=""
                                                        className="h-7 w-7 shrink-0 object-contain"
                                                    />
                                                )}
                                            </div>
                                            
                                            {/* Home team score */}
                                            <div className="text-center text-lg font-bold text-white">
                                                {isRevealed ? homeScore : ""}
                                            </div>

                                            {/* Away team score */}
                                            <div className="text-center text-lg font-bold text-white">
                                                {isRevealed ? awayScore : ""}
                                            </div>

                                            {/* Away team */}
                                            <div className="flex min-w-0 items-center justify-end gap-2">
                                                {match.awayTeam.logo && (
                                                    <img
                                                        src={match.awayTeam.logo}
                                                        alt=""
                                                        className="h-7 w-7 shrink-0 object-contain"
                                                    />
                                                )}
                                                <span className="truncate text-white">
                                                    {match.awayTeam.name}
                                                </span>
                                            </div>
                                        </div>

                                        {(status === "finished" || status === "Live") && (
                                            <div className="mt-2 text-center text-sm text-slate-400">
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