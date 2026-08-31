import Image from "next/image";
import TestComponent from "./components/testComponent";
import { getNhlStandings } from "@/lib/api/hockey";
import { group } from "console";

export default async function Home() {
  const standings = await getNhlStandings();
  const groups = standings.groups;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            This is my-nhl
          </h1>
          <TestComponent favTeam="Minnesota Wild"/>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Everything is under construction.
          </p>
        </div>
        <pre>{JSON.stringify(standings.groups, null, 2)}</pre>
      </main>
    </div>
  );
}
