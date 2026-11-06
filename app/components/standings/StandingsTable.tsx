import { StandingsGroup } from "@/lib/api/types";
import { group } from "console";

type StandingsTableProps = {
    conferenceGroups: StandingsGroup[];
};

export default function StandingsTable({
    conferenceGroups,
}: StandingsTableProps) {
    return(
        <div>
            {conferenceGroups.map((group) => (
                <section key={group.name}>
                    <h2 className="text-2xl font-semibold m-5">{group.name}</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-162.5 table-fixed border-collapse text-sm">

                            <colgroup>
                                <col className="w-[5%]"/>
                                <col className="w-[30%]"/>
                                <col className="w-[7%]"/>
                                <col className="w-[7%]"/>
                                <col className="w-[7%]"/>
                                <col className="w-[7%]"/>
                                <col className="w-[9%]"/>
                                <col className="w-[9%]"/>
                                <col className="w-[9%]"/>
                                <col className="w-[10%]"/>
                            </colgroup>

                            <thead className="border-b border-gray-600 bg-gray-800">
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

                            <tbody className="divide-y divide-gray-700">
                                {group.standings.map((standing) => (
                                    <tr
                                        key={`${group.name}-${standing.team.id}`}
                                        className="text-center odd:bg-gray-800 even:bg-gray-900"
                                    >
                                        <td>{standing.position}</td>
                                        <td className="text-left">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                                                    {standing.team.logo && (
                                                        <img
                                                            src={standing.team.logo}
                                                            alt={`${standing.team.name} logo`}
                                                            className="max-h-7 max-w-7 object-contain"
                                                        />
                                                    )}

                                                </div>
                                                {standing.team.name}
                                            </div>
                                        </td>
                                        <td>{standing.gamesPlayed}</td>
                                        <td>{standing.wins + standing.winsOvertime}</td>
                                        <td>{standing.loses}</td>
                                        <td>{standing.losesOvertime}</td>
                                        <td>{standing.scoredGoals}</td>
                                        <td>{standing.receivedGoals}</td>
                                        <td>
                                            {(standing.wins + standing.winsOvertime) * 2 + standing.losesOvertime}
                                        </td>
                                        <td>
                                            {standing.scoredGoals - standing.receivedGoals}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ))}
        </div>
    );
}