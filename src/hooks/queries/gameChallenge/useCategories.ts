import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type { Category } from "@/src/types/game.challenge.types";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["challenge", "categories"],
    queryFn: async () => {
      const { data } = await api.get<Category[]>("/challenge/categories");
      return data;
    },
    staleTime: 5 * 60 * 1_000,
  });
}
