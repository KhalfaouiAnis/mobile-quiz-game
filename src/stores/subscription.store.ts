import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createMMKV } from "react-native-mmkv";
import {
  GameEntitlement,
  GameId,
  SubscriptionState,
} from "@/src/lib/revenuecat/types";
import { SUBSCRIPTIONS_STORAGE_KEY } from "../constants";

// Dedicated MMKV instance for subscriptions
const mmkv = createMMKV({ id: SUBSCRIPTIONS_STORAGE_KEY });

const mmkvStorage = {
  getItem: (name: string) => mmkv.getString(name) ?? null,
  setItem: (name: string, value: string) => mmkv.set(name, value),
  removeItem: (name: string) => mmkv.remove(name),
};

const defaultEntitlement = (gameId: GameId): GameEntitlement => ({
  gameId,
  tier: null,
  isActive: false,
  expirationDate: null,
});

interface SubscriptionStore extends SubscriptionState {
  // Actions
  setEntitlements: (entitlements: Record<GameId, GameEntitlement>) => void;
  setLoading: (isLoading: boolean) => void;
  clearSubscriptions: () => void;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set) => ({
      // Initial state
      gadha: defaultEntitlement("gadha"),
      theChallenge: defaultEntitlement("theChallenge"),
      theLiar: defaultEntitlement("theLiar"),
      isLoading: false,
      lastSyncedAt: null,

      setEntitlements: (entitlements) =>
        set({
          ...entitlements,
          lastSyncedAt: Date.now(),
          isLoading: false,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      clearSubscriptions: () =>
        set({
          gadha: defaultEntitlement("gadha"),
          theChallenge: defaultEntitlement("theChallenge"),
          theLiar: defaultEntitlement("theLiar"),
          lastSyncedAt: null,
          isLoading: false,
        }),
    }),
    {
      name: "subscription-store",
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        gadha: state.gadha,
        theChallenge: state.theChallenge,
        theLiar: state.theLiar,
        lastSyncedAt: state.lastSyncedAt,
      }),
    },
  ),
);

// Selector helpers (use these in components to avoid re-renders)
export const selectGameEntitlement =
  (gameId: GameId) => (state: SubscriptionStore) =>
    state[gameId];

export const selectIsGameActive =
  (gameId: GameId) => (state: SubscriptionStore) =>
    state[gameId].isActive;

export const selectGameTier = (gameId: GameId) => (state: SubscriptionStore) =>
  state[gameId].tier;
