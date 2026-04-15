import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { GameBoard } from "@/src/types/game.gadha.types";

export function useGadhaGameBoard(sessionId: number) {
  return useQuery<GameBoard>({
    queryKey: ["gadha", "board", sessionId],
    queryFn: async () => {
      const { data } = await api.get<GameBoard>(`/gadha/sessions/${sessionId}`);
      return data;
    },
    // staleTime: Infinity,
  });
}
