// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import MatchesList from "../app/components/matches/MatchesList"
import { Match } from "../lib/api/types";

const mockMatches = [
    {
        id: 123,
        date: "2026-11-09T20:00:00Z",
        state: {
            clock: null,
            score: {
                current: "3 - 2",
                overTime: null,
                penalties: null,
            },
            description: "Finished",
        },
        awayTeam: {
            id: 1,
            name: "Boston Bruins",
            logo: null,
        },
        homeTeam: {
            id: 2,
            name: "Toronto Maple Leafs",
            logo: null,
        },
    },
] satisfies Match[];

const upcomingMatch = {
    id: 456,
    date: "2026-11-11T20:00:00Z",
    state: {
        clock: null,
        score: {
            current: null,
            overTime: null,
            penalties: null,
        },
        description: "Not started",
    },
    awayTeam: { id: 3, name: "New York Rangers", logo: null },
    homeTeam: { id: 4, name: "Detroit Red Wings", logo: null },
} satisfies Match;

const liveMatch = {
    id: 789,
    date: "2026-11-10T19:00:00Z",
    state: {
        clock: null,
        score: {
            current: "2 - 1",
            overTime: null,
            penalties: null,
        },
        description: "1st period",
    },
    awayTeam: { id: 5, name: "Chicago Blackhawks", logo: null },
    homeTeam: { id: 6, name: "Colorado Avalanche", logo: null },
} satisfies Match;

describe("MatchesList", () => {
    it("renders matches with correct team names", () => {
        render(<MatchesList matches={mockMatches}/>);

        expect(screen.getByText("NHL Matcher")).toBeInTheDocument();
        expect(screen.getByText("Boston Bruins")).toBeInTheDocument();
        expect(screen.getByText("Toronto Maple Leafs")).toBeInTheDocument();
    });

    it("hides the score by default", () => {
        render(<MatchesList matches={mockMatches}/>);

        expect(screen.queryByText("3", { exact: true })).not.toBeInTheDocument();
        expect(screen.queryByText("2", { exact: true })).not.toBeInTheDocument();

        expect(screen.getByRole("button", { name: "Visa resultat" })).toBeInTheDocument();
    });

    it("reveals the score when clicking button", async () => {
        const user = userEvent.setup();

        render(<MatchesList matches={mockMatches}/>);

        const revealButton = screen.getByRole("button", {
            name: "Visa resultat",
        });

        await user.click(revealButton);

        expect(screen.queryByText("3", { exact: true })).toBeInTheDocument();
        expect(screen.queryByText("2", { exact: true })).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "Dölj resultat" })).toBeInTheDocument();
    });

    it("hides the score again when clicking the hide button", async () => {
        const user = userEvent.setup();

        render(<MatchesList matches={mockMatches} />);

        await user.click(
            screen.getByRole("button", { name: "Visa resultat" }),
        );

        expect(screen.queryByText("3", { exact: true })).toBeInTheDocument();
        expect(screen.queryByText("2", { exact: true })).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", { name: "Dölj resultat" }),
        );

        expect(screen.queryByText("3", { exact: true })).not.toBeInTheDocument();
        expect(screen.queryByText("2", { exact: true })).not.toBeInTheDocument();

        expect(screen.getByRole("button", {name: "Visa resultat"}),
        ).toBeInTheDocument();
    });

    it("dispplays upcoming matches without a result button", () => {
        render(<MatchesList matches={[upcomingMatch]} />);

        expect(screen.getByText("KOMMANDE")).toBeInTheDocument();

        expect(
            screen.queryByRole("button", { name: "Visa resultat" }),
        ).not.toBeInTheDocument();

        expect(
            screen.getByText("New York Rangers"),
        ).toBeInTheDocument();

        expect(
            screen.getByText("Detroit Red Wings"),
        ).toBeInTheDocument();
    });

    it("displays live matches with the correct status and button", () => {
        render(<MatchesList matches={[liveMatch]} />);

        expect(screen.getByText("LIVE")).toBeInTheDocument();

        expect(
            screen.queryByRole("button", { name: "Visa aktuell ställning" }),
        ).toBeInTheDocument();

        expect(screen.getByText("Chicago Blackhawks")).toBeInTheDocument();
        expect(screen.getByText("Colorado Avalanche")).toBeInTheDocument();

    })
});