import { useQuery } from "@tanstack/react-query";
import { fetchGameOffering } from "@/src/lib/revenuecat/service";
import { GameId } from "@/src/lib/revenuecat/types";

export function useGameOffering(gameId: GameId) {
  return useQuery({
    queryKey: ["revenuecat", "offerings", gameId],
    queryFn: () => fetchGameOffering(gameId),
    staleTime: 1000 * 60 * 60, // Offerings rarely change; cache for 1 hour
    retry: 2,
  });
}
