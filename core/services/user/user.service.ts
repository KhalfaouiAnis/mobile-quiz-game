import { httpClient } from "@/core/api/httpClient";
import { ApiResponse, User } from "@/core/types";
import { UpdateProfileInterface } from "@/core/types/schema/user";

export const updateProfile = async (payload: UpdateProfileInterface) => {
  return httpClient.put<ApiResponse<User>>("/users/profile", payload);
};
