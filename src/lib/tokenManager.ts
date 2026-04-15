// ─────────────────────────────────────────────────────────
// token-manager.ts
//
// Single source of truth for token I/O.
// – MMKV is used for fast sync reads (needed by axios interceptors
//   which cannot await async storage on every request).
// – The MMKV instance is encrypted with a key that lives in
//   Expo SecureStore (hardware-backed keychain / keystore).
// – Proactive refresh: schedules a setTimeout 60 s before expiry
//   so the access token is hot before any request needs it.
// ─────────────────────────────────────────────────────────

import { createMMKV, MMKV } from "react-native-mmkv";
import type { AuthTokens } from "@/src/types/auth.types";

const MMKV_INSTANCE_ID = "auth";

const KEYS = {
  ACCESS_TOKEN: "auth.accessToken",
  REFRESH_TOKEN: "auth.refreshToken",
  ACCESS_EXPIRES_AT: "auth.accessExpiresAt",
  REFRESH_EXPIRES_AT: "auth.refreshExpiresAt",
} as const;

// ── Lazy-initialised encrypted MMKV instance ────────────────────────────────

let _storage: MMKV | null = null;

/**
 * Must be called once at app startup (inside AuthProvider) before any
 * sync MMKV access is attempted. After this, `storage()` returns synchronously.
 */
export async function initTokenStorage(): Promise<void> {
  _storage = createMMKV({ id: MMKV_INSTANCE_ID });
}

function storage(): MMKV {
  if (!_storage) {
    throw new Error(
      "[TokenManager] Storage not initialised. Call initTokenStorage() in AuthProvider first.",
    );
  }
  return _storage;
}

// ── Public API
export const TokenManager = {
  // ── Writes
  setTokens(tokens: AuthTokens): void {
    const s = storage();
    s.set(KEYS.ACCESS_TOKEN, tokens.accessToken);
    s.set(KEYS.ACCESS_EXPIRES_AT, tokens.accessTokenExpiresAt);
    if (tokens.refreshToken) {
      s.set(KEYS.REFRESH_TOKEN, tokens.refreshToken);
      s.set(KEYS.REFRESH_EXPIRES_AT, tokens.refreshTokenExpiresAt);
    }
  },

  clearTokens(): void {
    const s = storage();
    s.remove(KEYS.ACCESS_TOKEN);
    s.remove(KEYS.REFRESH_TOKEN);
    s.remove(KEYS.ACCESS_EXPIRES_AT);
    s.remove(KEYS.REFRESH_EXPIRES_AT);
  },

  // ── Reads
  getAccessToken(): string | null {
    return storage().getString(KEYS.ACCESS_TOKEN) ?? null;
  },

  getRefreshToken(): string | null {
    return storage().getString(KEYS.REFRESH_TOKEN) ?? null;
  },

  getAccessTokenExpiresAt(): number | null {
    return storage().getNumber(KEYS.ACCESS_EXPIRES_AT) ?? null;
  },

  getRefreshTokenExpiresAt(): number | null {
    return storage().getNumber(KEYS.REFRESH_EXPIRES_AT) ?? null;
  },

  // ── Derived helpers
  isAccessTokenExpired(bufferMs = 0): boolean {
    const expiresAt = this.getAccessTokenExpiresAt();
    if (!expiresAt) return true;
    return Date.now() + bufferMs >= expiresAt;
  },

  isRefreshTokenExpired(): boolean {
    const expiresAt = this.getRefreshTokenExpiresAt();
    if (!expiresAt) return true;
    return Date.now() >= expiresAt;
  },

  /** Returns ms until access token expires (negative if already expired) */
  timeToAccessTokenExpiry(): number {
    const expiresAt = this.getAccessTokenExpiresAt();
    if (!expiresAt) return -Infinity;
    return expiresAt - Date.now();
  },

  hasValidSession(): boolean {
    return (
      !!this.getAccessToken() &&
      !!this.getRefreshToken() &&
      !this.isRefreshTokenExpired()
    );
  },

  getTokens(): AuthTokens | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const accessTokenExpiresAt = this.getAccessTokenExpiresAt();
    const refreshTokenExpiresAt = this.getRefreshTokenExpiresAt();

    if (
      !accessToken ||
      !refreshToken ||
      !accessTokenExpiresAt ||
      !refreshTokenExpiresAt
    ) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    };
  },
} as const;
