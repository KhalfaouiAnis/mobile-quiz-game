import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { RevealResponse } from "@/src/types/game.gadha.types";

export function useRevealAnswer(sessionId: number, questionId: number) {
  return useQuery<RevealResponse>({
    queryKey: ["gadha", "reveal", sessionId, questionId],
    queryFn: async () => {
      const { data } = await api.get<RevealResponse>(
        `/gadha/sessions/${sessionId}/questions/${questionId}/reveal`,
      );
      return data;
    },
    // Cache reveal answers for the entire session — they never change
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
