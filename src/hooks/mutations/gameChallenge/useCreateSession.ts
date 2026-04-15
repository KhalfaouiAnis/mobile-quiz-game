import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { CreateSessionResponse } from "@/src/types/game.challenge.types";

export function useCreateSession() {
  return useMutation<CreateSessionResponse, Error, { categoryIds: number[] }>({
    mutationFn: async (payload) => {
      const { data } = await api.post<CreateSessionResponse>(
        "/challenge/sessions",
        payload,
      );
      return data;
    },
  });
}
