import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { LastAciveSessionStats } from "@/src/types/game.gadha.types";

export function useGadhaProgress() {
  return useQuery<LastAciveSessionStats>({
    queryKey: ["gadha", "analytics"],
    queryFn: async () => {
      const { data } = await api.get<LastAciveSessionStats>(
        `/gadha/sessions-analytics`,
      );
      return data;
    },
  });
}
