import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({
      resetToken,
      newPassword,
    }: {
      resetToken: string;
      newPassword: string;
    }) => {
      await api.post("/auth/reset-password", { resetToken, newPassword });
    },
  });
}
