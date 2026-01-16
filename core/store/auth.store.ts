import { queryClient } from "@/core/api/react-query";
import {
  ACC_TOKEN_STORAGE_KEY,
  AUTH_STORAGE_KEY,
  HAS_LAUNCHED,
} from "@/core/constants";

import { User } from "@/core/types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { mmkvStorage, zustandStorage } from "./storage";
import { TokenService } from "../services/token-manager";
import { httpClient } from "../api/httpClient";

interface AuthState {
  isReady: boolean;
  user: User | null;
  _hasHydrated: boolean;
  hasLaunched: boolean;
  authType: "STANDARD" | "GOOGLE" | "FACEBOOK" | "APPLE";

  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  setHasHydrated: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      authType: "STANDARD",
      _hasHydrated: false,
      isReady: false,
      hasLaunched: false,
      setUser: (user) => {
        set({ user });
      },
      signOut: async () => {
        if (get().authType === "GOOGLE") {
          await GoogleSignin.signOut();
        }
        TokenService.clearTokens();
        set({
          user: null,
          authType: "STANDARD",
          isReady: true,
        });
        queryClient.clear();
      },
      initialize: async () => {
        try {
          const hasLaunched = mmkvStorage.getBoolean(HAS_LAUNCHED);
          const accessToken = TokenService.getAccessToken();

          if (!accessToken) {
            set({ isReady: true, hasLaunched, user: null });
            return;
          }

          const decoded = jwtDecode<{ exp: number }>(accessToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
            if (!get().user) {
              const { data } = await httpClient.get("/auth/me");
              set({ isReady: true, user: data, hasLaunched });
            } else {
              set({ isReady: true });
            }
          } else {
            httpClient
              .get("/auth/me")
              .then(({ data }) =>
                set({ user: data, hasLaunched, isReady: true })
              )
              .catch(() => get().signOut());
          }
        } catch (e) {
          console.error("App bootstrap failed", e);
          get().signOut();
        }
      },
      setHasHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        user: state.user,
        hasLaunched: state.hasLaunched,
        authType: state.authType,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    }
  )
);

export const authStore = useAuthStore;

export default useAuthStore;
