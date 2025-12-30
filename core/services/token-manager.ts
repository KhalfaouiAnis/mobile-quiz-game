import { ACC_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "../constants";
import { mmkvStorage } from "../store/storage";

export const TokenService = {
  getAccessToken: () => mmkvStorage.getString(ACC_TOKEN_STORAGE_KEY),
  getRefreshToken: () => mmkvStorage.getString(REFRESH_TOKEN_STORAGE_KEY),

  setAccessToken: (accessToken: string) =>
    mmkvStorage.set(ACC_TOKEN_STORAGE_KEY, accessToken),
  setRefreshToken: (refreshToken: string) =>
    mmkvStorage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken),

  removeAccessToken: () => mmkvStorage.remove(ACC_TOKEN_STORAGE_KEY),
  removeRefreshToken: () => mmkvStorage.remove(REFRESH_TOKEN_STORAGE_KEY),

  setTokens: function (accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  },
  
  clearTokens: function () {
    this.removeAccessToken();
    this.removeRefreshToken();
  },
};
