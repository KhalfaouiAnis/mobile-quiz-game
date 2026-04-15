import axios, { InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/src/stores/auth.store";
import { TokenManager } from "./tokenManager";
import { QueueManager } from "./queue-manager";
import { AuthService } from "@/src/services/auth.service";
import { API_BASE_URL } from "@/src/constants";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 20_000,
  headers: { "Content-Type": "application/json", "Accept-Language": "ar" },
});

// ─── Request: attach access token
api.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = "ar";
    const token = TokenManager.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retried?: boolean;
    };

    // Only intercept 401s that haven't already been retried
    if (error.response?.status !== 401 || originalRequest._retried) {
      return Promise.reject(error);
    }

    if (TokenManager.isRefreshTokenExpired()) {
      await useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    // ── Case A: a refresh is already in flight ──────────────────────────────
    if (QueueManager.isRefreshing) {
      try {
        const freshToken = await QueueManager.enqueue();
        originalRequest._retried = true;
        originalRequest.headers.Authorization = `Bearer ${freshToken}`;
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    QueueManager.setRefreshing(true);
    originalRequest._retried = true;

    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      QueueManager.drainWithError(error);
      await useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    try {
      const { tokens } = await AuthService.refresh(refreshToken);
      TokenManager.setTokens(tokens);
      useAuthStore.getState().onTokensRefreshed();
      
      QueueManager.drainWithToken(tokens.accessToken);
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      QueueManager.drainWithError(refreshError);
      await useAuthStore.getState().logout();
      return Promise.reject(refreshError);
    }
  },
);
