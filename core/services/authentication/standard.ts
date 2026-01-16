import { httpClient } from "@/core/api/httpClient";
import { ApiResponse, AuthResponse, User } from "@/core/types";
import { SignupInterface } from "@/core/types/schema/auth";
import axios from "axios";
import { TokenService } from "../token-manager";

export const attemptLogin = async (username: string, password: string) => {
  return httpClient.post<ApiResponse<AuthResponse>>("/auth/login", {
    username,
    password,
  });
};

export const createAccount = async (data: SignupInterface) => {
  return httpClient.post<{ email: string; otp_sent: boolean }>(
    "/auth/register",
    data
  );
};

export const requestPasswordReset = async (email: string) => {
  return httpClient.post<
    ApiResponse<{
      token: string | null;
      otp_sent: boolean;
    }>
  >("/auth/forgot-password", { email });
};

export const resetPassword = async (
  newPassword: string,
  confirmPassword: string
) => {
  return axios.post<ApiResponse>(
    "/auth/reset-password",
    {
      newPassword,
      confirmPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${TokenService.getPasswordResetToken()}`,
      },
    }
  );
};

export const requestOTP = async (email: string) => {
  return httpClient.post("/auth/request-otp", { email });
};

export const verifyPasswordResetOTP = async (email: string, otp: string) => {
  return httpClient.post<ApiResponse>("/auth/verify-reset-otp", {
    email,
    otp,
  });
};

export const verifyOTP = async (email: string, otp: string) => {
  return httpClient.post<ApiResponse>("/auth/verify-otp", {
    email,
    otp,
  });
};
