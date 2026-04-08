import { create } from "zustand";
import { Team } from "../types";

interface GameState {
  teams: Record<number, Partial<Team>>;
  questionTimeLimit: number;
  optimisticAnsweredIds: Set<number>;
  team1BoostActive: boolean;
  team2BoostActive: boolean;

  actions: {
    initGame: (teamsData: Team[], timeLimit: number) => void;
    addScore: (
      teamIndex: number,
      basePoints: number,
      applyBoost: boolean,
    ) => void;
    markAnswered: (questionId: number) => void;
    activateBoost: (index: 0 | 1) => void;
    deactivateBoosts: () => void;
  };
}

export const useGame1Store = create<GameState>()((set) => ({
  teams: {},
  questionTimeLimit: 15,
  team1BoostActive: false,
  team2BoostActive: false,
  optimisticAnsweredIds: new Set(),
  actions: {
    initGame: (teamsData, timeLimit) => {
      const teams = teamsData.reduce(
        (acc, team, index) => {
          acc[index] = team;
          return acc;
        },
        {} as Record<number, Partial<Team>>,
      );

      set({ teams, questionTimeLimit: timeLimit });
    },
    addScore: (teamIndex, basePoints, applyBoost) => {
      set((state) => {
        const currentTeam = state.teams[teamIndex];
        const multiplier = applyBoost ? 2 : 1;
        const newScore = (currentTeam.score || 0) + basePoints * multiplier;

        return {
          teams: {
            ...state.teams,
            [teamIndex]: {
              ...currentTeam,
              score: newScore,
            },
          },
        };
      });
    },
    markAnswered: (questionId) =>
      set((state) => ({
        optimisticAnsweredIds: new Set(state.optimisticAnsweredIds).add(
          questionId,
        ),
      })),
    activateBoost: (index) =>
      set({ team1BoostActive: index === 0, team2BoostActive: index === 1 }),
    deactivateBoosts: () =>
      set({ team1BoostActive: false, team2BoostActive: false }),
  },
}));

export const useGame1Team = (teamIndex: number) =>
  useGame1Store((s) => s.teams[teamIndex]);
export const useGame1Actions = () => useGame1Store((s) => s.actions);
