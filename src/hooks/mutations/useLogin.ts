import type { LoginFormData } from "@/src/schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../useAuth";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      await login(data);
    },
  });
}
