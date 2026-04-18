import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { SessionBoard } from "@/src/types/game.gadha.types";

export function useGadhaGameBoard(sessionId: number) {
  return useQuery<SessionBoard>({
    queryKey: ["gadha", "board", sessionId],
    queryFn: async () => {
      const { data } = await api.get<SessionBoard>(
        `/gadha/sessions/${sessionId}`,
      );
      return data;
    },
    staleTime: Infinity,
  });
}
