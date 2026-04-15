import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      await api.post("/auth/forgot-password", { email });
    },
  });
}
