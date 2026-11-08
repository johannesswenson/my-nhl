import { getNhlMatches, getNhlStandings } from "@/lib/api/hockey";
import MatchesList from "./components/matches/MatchesList";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  
  const matches = await getNhlMatches();

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            my<span className="text-blue-500">-</span>nhl
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            NHL without the spoilers.
          </p>
        </header> 
        <MatchesList matches={matches} />
      </main>
    </div>
  );
}
