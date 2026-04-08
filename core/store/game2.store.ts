import { create } from "zustand";
import { Question } from "../types";
import { Game2State } from "../types/socket-types";

interface GameStore {
  isConnected: boolean;
  gameState: Game2State | null;
  currentQuestion: Question | null;

  actions: {
    setConnectionStatus: (status: boolean) => void;
    syncGameState: (state: Game2State) => void;
    setCurrentTurn: (data: { playerId: string; question: Question }) => void;
    resetGame: () => void;
  };
}

export const useGame2Store = create<GameStore>()((set) => ({
  isConnected: false,
  gameState: null,
  currentQuestion: null,
  actions: {
    setConnectionStatus: (status) => set({ isConnected: status }),
    syncGameState: (state) => set({ gameState: state }),
    setCurrentTurn: ({ playerId, question }) =>
      set((prev) => ({
        currentQuestion: question,
        gameState: prev.gameState
          ? { ...prev.gameState, currentTurn: playerId }
          : null,
      })),
    resetGame: () => set({ gameState: null, currentQuestion: null }),
  },
}));

export const useGame2Actions = () => useGame2Store((s) => s.actions);
