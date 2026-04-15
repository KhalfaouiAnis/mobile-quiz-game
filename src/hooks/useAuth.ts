// ─────────────────────────────────────────────────────────
// use-auth.ts
//
// The primary hook for screens and components.
// Composes the Zustand store + AuthService into a clean API
// so callers never import from multiple auth modules.
// ─────────────────────────────────────────────────────────

import { useAuthStore } from "@/src/stores/auth.store";
import { AuthService } from "@/src/services/auth.service";
import { TokenManager } from "@/src/lib/tokenManager";
import type { LoginPayload } from "@/src/types/auth.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AUTH_USER_QUERY_KEY } from "@/src/constants";

// use-auth.ts
// The only hook feature code ever imports from the auth module.
//
// - useQuery('/auth/me') is the user cache. react-query owns it.
// - login / logout are mutations.
// - status comes from Zustand (it's not async data, it's a lifecycle state).
//
// React-query's queryClient is the source of truth for the user object.
// Zustand's store is the source of truth for the auth lifecycle status.
// They never overlap.

export function useAuth() {
  const queryClient = useQueryClient();
  const { status, setStatus, logout: storeLogout } = useAuthStore();

  // ── User data ──────────────────────────────────────────────────────────────
  // Only runs when authenticated. On 401 the interceptor handles refresh;
  // if refresh fails it calls storeLogout which sets status → unauthenticated,
  // which disables this query automatically.
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: AuthService.me,
    enabled: status === "authenticated",
    staleTime: 5 * 60 * 1000, // treat user data as fresh for 5 min
    retry: false, // let the interceptor handle 401s, not react-query
  });

  // ── Login ──────────────────────────────────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),
    onSuccess: ({ user: loggedInUser, tokens }) => {
      TokenManager.setTokens(tokens);
      // Seed the query cache directly — avoids a redundant /auth/me round-trip
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, loggedInUser);
      setStatus("authenticated");
    },
  });

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logoutMutation = useMutation({
    mutationFn: storeLogout,
    onSettled: () => {
      // Always clear cache even if server-side logout fails
      queryClient.removeQueries({ queryKey: AUTH_USER_QUERY_KEY });
    },
  });

  return {
    // State
    user,
    status,
    isAuthenticated: status === "authenticated",
    isBootstrapping: status === "bootstrapping",
    isLoadingUser,

    // Actions
    login: loginMutation.mutateAsync,
    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,

    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
