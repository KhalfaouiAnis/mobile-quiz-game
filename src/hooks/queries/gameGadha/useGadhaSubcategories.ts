import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { GameGadhaCategory } from "@/src/types/game.gadha.types";

export function useGadhaSubcategories() {
  return useQuery<GameGadhaCategory[]>({
    queryKey: ["gadha", "subcategories"],
    queryFn: async () => {
      const { data } = await api.get<GameGadhaCategory[]>(
        "/gadha/subcategories",
      );
      return data;
    },
    staleTime: 5 * 60 * 1_000,
  });
}
