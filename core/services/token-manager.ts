import {
  ACC_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  RESET_PASSWORD_TOKEN,
} from "../constants";
import { mmkvStorage } from "../store/storage";

export const TokenService = {
  getAccessToken: () => mmkvStorage.getString(ACC_TOKEN_STORAGE_KEY),
  getRefreshToken: () => mmkvStorage.getString(REFRESH_TOKEN_STORAGE_KEY),
  getPasswordResetToken: () => mmkvStorage.getString(RESET_PASSWORD_TOKEN),

  setAccessToken: (accessToken: string) =>
    mmkvStorage.set(ACC_TOKEN_STORAGE_KEY, accessToken),
  setRefreshToken: (refreshToken: string) =>
    mmkvStorage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken),
  setPasswordResetToken: (token: string) =>
    mmkvStorage.set(RESET_PASSWORD_TOKEN, token),

  removeAccessToken: () => mmkvStorage.remove(ACC_TOKEN_STORAGE_KEY),
  removeRefreshToken: () => mmkvStorage.remove(REFRESH_TOKEN_STORAGE_KEY),
  removePasswordResetToken: () => mmkvStorage.remove(RESET_PASSWORD_TOKEN),

  setTokens: function (accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  },

  clearTokens: function () {
    this.removeAccessToken();
    this.removeRefreshToken();
  },
};
