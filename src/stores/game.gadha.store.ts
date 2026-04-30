import { create } from "zustand";
import type { Team } from "@/src/types/game.gadha.types";
import { useShallow } from "zustand/shallow";

interface GameState {
  teams: Record<number, Partial<Team>>;
  questionTimeLimit: number;
  currentTeamId: number | null;
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
    switchTurn: (nextTeamId: number) => void;
  };
}

export const useGadhaGameStore = create<GameState>()((set) => ({
  teams: {},
  currentTeamId: null,
  questionTimeLimit: 25,
  team1BoostActive: false,
  team2BoostActive: false,
  optimisticAnsweredIds: new Set(),
  actions: {
    initGame: (teamsData, timeLimit) => {
      const teams = {
        0: teamsData[0],
        1: teamsData[1],
      };

      const startingTeam = teamsData.find((t) => t.is_current_turn);

      set({
        teams,
        questionTimeLimit: timeLimit,
        optimisticAnsweredIds: new Set(),
        currentTeamId: startingTeam?.id ?? teamsData[0].id,
      });
    },
    switchTurn: (nextTeamId) => {
      set({ currentTeamId: nextTeamId });
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
              is_boost_used: applyBoost,
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

export const useGadhaGameActions = () =>
  useGadhaGameStore(useShallow((s) => s.actions));
