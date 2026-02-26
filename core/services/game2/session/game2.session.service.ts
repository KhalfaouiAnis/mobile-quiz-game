import { httpClient } from "@/core/api/httpClient";
import { ApiResponse } from "@/core/types";
import { JoinGame2Interface } from "@/core/types/schema/game2";

export const joinGame2Sesion = async (data: JoinGame2Interface) => {
  return httpClient.post<ApiResponse<{}>>(`/game2/sessions/${data.code}/join`, {
    name: data.name,
    avatar: data.avatar,
  });
};
