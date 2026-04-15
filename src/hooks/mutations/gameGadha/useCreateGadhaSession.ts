import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type {
  CreateGadhaGameSession,
  CreateSessionResponse,
} from "@/src/types/game.gadha.types";

export function useCreateGadhaSession() {
  return useMutation<CreateSessionResponse, Error, CreateGadhaGameSession>({
    mutationFn: async (payload) => {
      const { data } = await api.post<CreateSessionResponse>(
        "/gadha/sessions",
        payload,
      );
      return data;
    },
  });
}
