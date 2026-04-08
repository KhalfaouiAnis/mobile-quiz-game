import { httpClient } from "@/core/api/httpClient";
import { ApiResponse, User } from "@/core/types";
import { UpdatePasswordInterface, UpdateProfileInterface } from "@/core/types/schema/user";

export const updateProfile = async (payload: UpdateProfileInterface) => {
  return httpClient.put<ApiResponse<User>>("/users/profile", payload);
};

export const updatePassword = async (payload: UpdatePasswordInterface) => {
  return httpClient.put<ApiResponse<User>>("/users/change-password", payload);
};
