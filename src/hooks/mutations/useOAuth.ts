import { AUTH_USER_QUERY_KEY } from "@/src/constants";
import { api } from "@/src/lib/api";
import {
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
} from "@/src/lib/oauth";
import { queryClient } from "@/src/lib/query-client";
import { TokenManager } from "@/src/lib/tokenManager";
import { useAuthStore } from "@/src/stores/auth.store";
import { AuthResponse } from "@/src/types/auth.types";
import { useMutation } from "@tanstack/react-query";

function handleSuccess(data: AuthResponse) {
  const { setStatus } = useAuthStore.getState();

  TokenManager.setTokens(data.tokens);
  queryClient.setQueryData(AUTH_USER_QUERY_KEY, data.user);
  setStatus("authenticated");
}

export function useGoogleAuth() {
  return useMutation({
    mutationFn: async () => {
      const idToken = await signInWithGoogle();
      const res = await api.post<AuthResponse>("/auth/google", { idToken });

      return res.data;
    },
    onSuccess: (data) => handleSuccess(data),
  });
}

export function useFacebookAuth() {
  return useMutation({
    mutationFn: async () => {
      const accessToken = await signInWithFacebook();
      const res = await api.post<AuthResponse>("/auth/facebook", {
        accessToken,
      });
      return res.data;
    },
    onSuccess: (data) => handleSuccess(data),
  });
}

export function useAppleAuth() {
  return useMutation({
    mutationFn: async () => {
      const { identityToken, givenName, familyName } = await signInWithApple();
      const res = await api.post<AuthResponse>("/auth/apple", {
        identityToken,
        givenName,
        familyName,
      });
      return res.data;
    },
    onSuccess: (data) => handleSuccess(data),
  });
}
