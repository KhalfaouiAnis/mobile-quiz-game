import axios from "axios";
import { TokenService } from "../services/token-manager";

let onUnauthorized: () => void = () => {};

export const injectLogout = (callback: () => void) => {
  onUnauthorized = callback;
};

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL + "/api/v1",
});

httpClient.interceptors.request.use(async (config) => {
  const token = TokenService.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenService.getRefreshToken();
        const { data } = await axios.post(
          process.env.EXPO_PUBLIC_API_URL + "/api/v1/auth/refresh",
          {
            token: refreshToken,
          }
        );

        TokenService.setAccessToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        TokenService.clearTokens();
        onUnauthorized();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
