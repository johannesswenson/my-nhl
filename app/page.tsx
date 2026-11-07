import { getNhlMatches, getNhlStandings } from "@/lib/api/hockey";
import MatchesList from "./components/matches/MatchesList";

export default async function Home() {
  const standings = await getNhlStandings();
  const conferenceGroups = standings.groups.filter((group) => 
    group.name.toLowerCase().includes("conference"),);

  const matches = await getNhlMatches();

  return (
    <div className="font-sans dark:bg-black">
      <main className="">
        <h1 className="text-3xl font-semibold">This is my-nhl</h1>
        <MatchesList matches={matches} />
      </main>
    </div>
  );
}
