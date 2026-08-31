export type Team = {
    id: number;
    name: string;
    logo: string | null;
};

export type Standing = {
    team: Team;
    wins: number;
    loses: number;
    position: number;
    gamesPlayed: number;
    scoredGoals: number;
    winsOvertime: number;
    losesOvertime: number;
    receivedGoals: number;
};

export type StandingsGroup = {
    name: string;
    standings: Standing[];
};

export type NhlStandingsResponse = {
    groups: StandingsGroup[];
};