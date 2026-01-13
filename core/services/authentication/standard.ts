import { httpClient } from "@/core/api/httpClient";
import { User } from "@/core/types";
import { SignupInterface } from "@/core/types/schema/auth";

export const attemptLogin = async (
  password: string,
  email?: string,
  username?: string
) => {
  return httpClient.post<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>("/auth/login", {
    email,
    username,
    password,
  });
};

export const createAccount = async (data: SignupInterface) => {
  return httpClient.post<{ user: User }>("/auth/register", data);
};

export const requestPasswordReset = async (email: string) => {
  return httpClient.post("/auth/forgot-password", { email });
};

export const requestOTP = async (email: string) => {
  return httpClient.post("/auth/request-otp", { email });
};

export const verifyOTP = async (email: string, otp: string) => {
  return httpClient.post<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>("/auth/verify-otp", {
    email,
    otp,
  });
};
