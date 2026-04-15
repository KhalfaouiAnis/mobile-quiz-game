import { create } from "zustand";
import { AuthStatus } from "@/src/types/auth.types";
import { TokenManager } from "@/src/lib/tokenManager";
import { AuthService } from "../services/auth.service";

interface AuthStore {
  status: AuthStatus;
  tokenVersion: number;
  onTokensRefreshed: () => void;
  setStatus: (status: AuthStatus) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: "bootstrapping",
  tokenVersion: 0,
  setStatus: (status) => set({ status }),
  onTokensRefreshed: () => set((s) => ({ tokenVersion: s.tokenVersion + 1 })),
  logout: async () => {
    const refreshToken = TokenManager.getRefreshToken();
    if (refreshToken) await AuthService.logout(refreshToken);
    TokenManager.clearTokens();
    set({ status: "unauthenticated" });
  },
}));
