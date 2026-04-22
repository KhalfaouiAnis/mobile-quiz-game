import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCustomerInfo,
  getGameEntitlement,
} from "@/src/lib/revenuecat/service";
import { useSubscriptionStore } from "@/src/stores/subscription.store";
import { GAMES } from "@/src/lib/revenuecat/config";
import { GameId, GameEntitlement } from "@/src/lib/revenuecat/types";

export const CUSTOMER_INFO_QUERY_KEY = ["revenuecat", "customerInfo"] as const;

export function useCustomerInfo() {
  const setEntitlements = useSubscriptionStore((s) => s.setEntitlements);

  return useQuery({
    queryKey: CUSTOMER_INFO_QUERY_KEY,
    queryFn: async () => {
      const customerInfo = await fetchCustomerInfo();

      const entitlements = GAMES.reduce<Record<GameId, GameEntitlement>>(
        (acc, gameId) => {
          acc[gameId] = getGameEntitlement(customerInfo, gameId);
          return acc;
        },
        {} as Record<GameId, GameEntitlement>,
      );

      setEntitlements(entitlements);
      return customerInfo;
    },
    staleTime: 1000 * 60 * 5, // Consider fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
    retry: 2,
  });
}

// Call this after any purchase/restore to force a fresh fetch
export function useInvalidateCustomerInfo() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: CUSTOMER_INFO_QUERY_KEY });
}
