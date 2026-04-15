// use-bootstrap-auth.ts
//
// Called ONCE in your root _layout.tsx. That's its only job.
// Replaces AuthProvider — no wrapper component needed.
//
// Usage:
//   export default function RootLayout() {
//     const { isReady } = useBootstrapAuth();
//     if (!isReady) return <SplashScreen />;
//     return <Stack />;
//   }

import { useEffect, useRef } from "react";
import { initTokenStorage, TokenManager } from "@/src/lib/tokenManager";
import { SessionManager } from "@/src/lib/session-manager";
import { AuthService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/stores/auth.store";

const PROACTIVE_REFRESH_BUFFER_MS = 90_000;

export function useBootstrapAuth() {
  const { status, tokenVersion, setStatus, onTokensRefreshed, logout } =
    useAuthStore();
  const bootstrapped = useRef(false);

  // ── Init + token check (runs once) ────────────────────────────────────────
  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    (async () => {
      try {
        await initTokenStorage();

        if (!TokenManager.hasValidSession()) {
          setStatus("unauthenticated");
          return;
        }

        if (TokenManager.isAccessTokenExpired()) {
          const { tokens } = await AuthService.refresh(
            TokenManager.getRefreshToken()!,
          );
          TokenManager.setTokens(tokens);
        }

        setStatus("authenticated");
      } catch {
        await logout();
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status !== "authenticated") return;

    const expiresAt = TokenManager.getAccessTokenExpiresAt();
    if (!expiresAt) return;

    const delay = Math.max(
      0,
      expiresAt - Date.now() - PROACTIVE_REFRESH_BUFFER_MS,
    );

    const timer = setTimeout(async () => {
      const refreshToken = TokenManager.getRefreshToken();

      if (!refreshToken || TokenManager.isRefreshTokenExpired()) {
        await logout();
        return;
      }
      try {
        const { tokens } = await AuthService.refresh(refreshToken);
        TokenManager.setTokens(tokens);
        // Ticking tokenVersion causes this effect to re-run and schedule
        // the next refresh against the new expiry.
        onTokensRefreshed();
      } catch {
        await logout();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [status, tokenVersion]);

  // ── Session manager follows auth status ───────────────────────────────────
  useEffect(() => {
    if (status === "authenticated") {
      SessionManager.start();
    } else {
      SessionManager.stop();
    }
  }, [status]);

  return { isReady: status !== "bootstrapping" };
}
