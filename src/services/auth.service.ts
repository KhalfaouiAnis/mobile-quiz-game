// ─────────────────────────────────────────────────────────
// auth.service.ts
//
// Raw API calls for auth endpoints.
// Uses a separate axios instance WITHOUT the auth interceptor
// to prevent circular dependency (interceptor calls refresh,
// refresh calls interceptor …).
// ─────────────────────────────────────────────────────────

import axios from "axios";
import { API_BASE_URL } from "@/src/constants/index";
import type {
  AuthUser,
  LoginPayload,
  AuthResponse,
  RefreshResponse,
} from "@/src/types/auth.types";

const authClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

export const AuthService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await authClient.post<AuthResponse>(
      "/auth/login",
      payload,
    );
    return data;
  },

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    const { data } = await authClient.post<RefreshResponse>("/auth/refresh", {
      refreshToken,
    });
    return data;
  },

  async logout(refreshToken: string): Promise<void> {
    try {
      await authClient.post("/auth/logout", { refreshToken });
    } catch {}
  },

  me: async (): Promise<AuthUser> => {
    const { api } = await import("@/src/lib/api");
    const { data } = await api.get<AuthUser>("/auth/me");
    return data;
  },
} as const;
