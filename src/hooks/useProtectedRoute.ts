// ─────────────────────────────────────────────────────────
// use-protected-route.ts
//
// Drop this in any screen that requires authentication.
// On Expo Router: redirects to /login if unauthenticated.
// On React Navigation: call the returned `redirect` action.
//
// Usage (Expo Router):
//   export default function DashboardScreen() {
//     useProtectedRoute();
//     return <Dashboard />;
//   }
// ─────────────────────────────────────────────────────────

import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/src/stores/auth.store";

export function useProtectedRoute() {
  const status = useAuthStore(store => store.status);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (status === "bootstrapping") return;

    const inAuthGroup = segments[0] === "(auth)";

    if (status === "unauthenticated" && !inAuthGroup) {
      router.replace("/(auth)/signin");
    } else if (status === "authenticated" && inAuthGroup) {
      router.replace("/(app)/(main)/index");
    }
  }, [status, segments]);

  return { isReady: status !== "bootstrapping" };
}