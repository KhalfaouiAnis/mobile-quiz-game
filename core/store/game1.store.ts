import { create } from "zustand";
import { CreateGameSessionRequest, Team } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { zustandStorage } from "./storage";
import { GAME1_STORAGE_KEY } from "../constants";

interface SessionState {
  boostersByTeam: Record<number, boolean>;
  teams: Team[];
  isBoosterAppliedToCurrentTurn: boolean;
  currentTurn: number;
}

interface Game1State {
  createGameSession: CreateGameSessionRequest;
  sessions: Record<number, SessionState>;
  setTeams: (sessionId: number, teams: Team[]) => void;
  activateTeamBooster: (sessionId: number, teamId: number) => void;
  toggleTurn: (sessionId: number, teamId: number) => void;
  resetSession: (sessionId: number) => void;
  consumeBooster: (sessionId: number) => void;
  adTeam: (team: CreateGameSessionRequest["teams"][0]) => void;
  addSubcategory: (id: number) => void;
}

const useGame1Store = create<Game1State>()(
  persist(
    (set) => ({
      sessions: {},
      createGameSession: {
        teams: [],
        game_type_id: 1,
        sub_category_ids: [],
        question_time_limit: "FIFTEEN_SECONDS",
      },
      setTeams: (sessionId, teams) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [sessionId]: {
              ...state.sessions[sessionId],
              teams,
            },
          },
        })),
      activateTeamBooster: (sessionId, teamId) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [sessionId]: {
              ...state.sessions[sessionId],
              boostersByTeam: {
                ...(state.sessions[sessionId]?.boostersByTeam || {}),
                [teamId]: true,
              },
              isBoosterAppliedToCurrentTurn: true,
            },
          },
        })),
      consumeBooster: (sessionId) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [sessionId]: {
              ...state.sessions[sessionId],
              isBoosterAppliedToCurrentTurn: false,
            },
          },
        })),
      toggleTurn: (sessionId, teamId) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [sessionId]: {
              ...state.sessions[sessionId],
              currentTurn: teamId,
            },
          },
        })),
      resetSession: (sessionId) =>
        set((state) => {
          const newSessions = { ...state.sessions };
          delete newSessions[sessionId];
          return { sessions: newSessions };
        }),
      addSubcategory: (id) =>
        set((state) => {
          const sub_category_ids = new Set(
            state.createGameSession.sub_category_ids,
          );
          if (state.createGameSession.sub_category_ids.length < 6) {
            sub_category_ids.add(id);
          }
          return {
            createGameSession: {
              ...state.createGameSession,
              sub_category_ids: Array.from(sub_category_ids),
            },
          };
        }),
      adTeam: (team) =>
        set((state) => {
          const teams = new Set(state.createGameSession.teams);
          if (state.createGameSession.teams.length < 2) {
            teams.add(team);
          }
          return {
            createGameSession: {
              ...state.createGameSession,
              teams: Array.from(teams),
            },
          };
        }),
    }),
    {
      name: GAME1_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        sessions: state.sessions,
      }),
    },
  ),
);

export default useGame1Store;
export const game1Store = useGame1Store;

interface GameState {
  teams: Record<number, Partial<Team>>;
  optimisticAnsweredIds: Set<number>;

  actions: {
    initGame: (teamsData: Team[]) => void;
    addScore: (teamId: number, basePoints: number, applyBoost: boolean) => void;
    markAnswered: (questionId: number) => void;
  };
}

export const useGameStore = create<GameState>()(
  immer((set) => ({
    teams: {},
    optimisticAnsweredIds: new Set(),
    actions: {
      initGame: (teamsData) =>
        set((state) => {
          teamsData.forEach((t) => {
            state.teams[t.id] = {
              name: t.name,
              score: t.score ?? 0,
              is_boost_used: t.is_boost_used ?? false,
            };
          });
        }),
      addScore: (teamId, basePoints, applyBoost) =>
        set((state) => {
          const team = state.teams[teamId];
          if (!team) return;

          const multiplier = applyBoost ? 2 : 1;
          const pointsToAdd = basePoints * multiplier;

          team?.score && team.score === team.score + pointsToAdd;

          if (applyBoost) {
            team.is_boost_used = true;
          }
        }),
      markAnswered: (qId) =>
        set((state) => {
          state.optimisticAnsweredIds.add(qId);
        }),
    },
  })),
);

export const useGame1Team = (teamId: number) =>
  useGameStore((s) => s.teams[teamId]);
export const useGame1Actions = () => useGameStore((s) => s.actions);
