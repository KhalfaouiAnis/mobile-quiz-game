// ─────────────────────────────────────────────────────────
// session-manager.ts
//
// Handles two concerns:
//
// 1. FOREGROUND REFRESH
//    When the app returns from background, check if the access
//    token needs refreshing before the next API call fires.
//    This avoids every screen getting a 401 on resume.
//
// 2. INACTIVITY TIMEOUT (optional, off by default)
//    If the app is in the background for longer than
//    INACTIVITY_TIMEOUT_MS, trigger a biometric re-auth gate.
//
// Call SessionManager.start() inside AuthProvider once the
// user is authenticated; call .stop() on logout.
// ─────────────────────────────────────────────────────────

import { AppState, AppStateStatus } from "react-native";
import { useAuthStore } from "@/src/stores/auth.store";
import { hideSystemBars } from "./navigation-bar";
import { TokenManager } from "./tokenManager";
import { AuthService } from "../services/auth.service";

/** Refresh if token expires within this window after foregrounding */
const FOREGROUND_REFRESH_THRESHOLD_MS = 90_000;

let _backgroundedAt: number | null = null;
let _appStateSubscription: ReturnType<typeof AppState.addEventListener> | null =
  null;

async function handleForeground(): Promise<void> {
  hideSystemBars();
  const store = useAuthStore.getState();

  // Not authenticated — nothing to do
  if (store.status !== "authenticated") return;

  if (TokenManager.isAccessTokenExpired(FOREGROUND_REFRESH_THRESHOLD_MS)) {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken || TokenManager.isRefreshTokenExpired()) {
      await store.logout();
      return;
    }
    try {
      const { tokens } = await AuthService.refresh(refreshToken);
      console.log(tokens);

      TokenManager.setTokens(tokens);
    } catch {
      await store.logout();
    }
  }
}

function handleBackground(): void {
  _backgroundedAt = Date.now();
}

export const SessionManager = {
  start(): void {
    if (_appStateSubscription) return;

    _appStateSubscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (nextState === "active") {
          handleForeground();
        } else if (nextState === "background" || nextState === "inactive") {
          handleBackground();
        }
      },
    );
  },

  stop(): void {
    _appStateSubscription?.remove();
    _appStateSubscription = null;
    _backgroundedAt = null;
  },
} as const;
