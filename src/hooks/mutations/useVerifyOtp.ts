import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";

interface VerifyOtpResponse {
  resetToken: string;
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const res = await api.post<VerifyOtpResponse>("/auth/verify-otp", {
        email,
        otp,
      });
      return res.data;
    },
  });
}
