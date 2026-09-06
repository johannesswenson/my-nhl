import { getNhlStandings } from "@/lib/api/hockey";

export default async function Home() {
  const standings = await getNhlStandings();
  const conferenceGroups = standings.groups.filter((group) => 
    group.name.toLowerCase().includes("conference"),);

  return (
    <div className="flex flex-col items-center font-sans dark:bg-black">
      <main className="">
        <h1 className="text-3xl font-semibold">This is my-nhl</h1>
        {conferenceGroups.map((group) => (
          <section key={group.name}>
            <h2 className="text-2xl font-semibold">{group.name}</h2>

            <table className="">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th className="text-left">Team</th>
                  <th>GP</th>
                  <th>W</th>
                  <th>L</th>
                  <th>OTL</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>PTS</th>
                  <th>DIFF</th>
                </tr>
              </thead>

              <tbody>
                {group.standings.map((standing) => (
                  <tr key={`${group.name}-${standing.team.id}`} className="text-center">
                    <td>{standing.position}</td>
                    <td className="text-left">{standing.team.name}</td>
                    <td>{standing.gamesPlayed}</td>
                    <td>{standing.wins + standing.winsOvertime}</td>
                    <td>{standing.loses}</td>
                    <td>{standing.losesOvertime}</td>
                    <td>{standing.scoredGoals}</td>
                    <td>{standing.receivedGoals}</td>
                    <td>{(standing.wins + standing.winsOvertime) * 2 + standing.losesOvertime}</td>
                    <td>{standing.scoredGoals - standing.receivedGoals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
    ))}
      </main>
    </div>
  );
}
