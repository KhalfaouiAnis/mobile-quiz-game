import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { ResultsResponse } from "@/src/types/game.gadha.types";

export function useGadhaResults(sessionId: number) {
  return useQuery<ResultsResponse>({
    queryKey: ["gadha", "results", sessionId],
    queryFn: async () => {
      const { data } = await api.get<ResultsResponse>(
        `/gadha/sessions/${sessionId}/results`,
      );
      return data;
    },
  });
}
