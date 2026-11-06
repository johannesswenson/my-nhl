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

export type MatchTeam = {
    id: number;
    logo: string | null;
    name: string;
};

export type Match = {
    id: number;
    date: string;
    state: {
        clock: string | null;
        score: {
            current: string | null;
            overTime: string | null;
            penalties: string | null;
        };
        description: string;
    };
    awayTeam: MatchTeam;
    homeTeam: MatchTeam;
};

export type MatchesResponse ={
    data: Match[];
};