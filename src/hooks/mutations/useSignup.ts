import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { SignupFormData } from "@/src/schemas/auth.schemas";
import { TokenManager } from "@/src/lib/tokenManager";
import { useAuthStore } from "@/src/stores/auth.store";
import { AuthResponse } from "@/src/types/auth.types";
import { AUTH_USER_QUERY_KEY } from "@/src/constants";
import { toast } from "sonner-native";
import { useTranslation } from "react-i18next";

export function useSignup() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (data: SignupFormData) => {
      const res = await api.post<AuthResponse>("/auth/signup", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(t("welcome.account_created"));
      TokenManager.setTokens(data.tokens);
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, data.user);
      useAuthStore.getState().setStatus("authenticated");
    },
  });
}
