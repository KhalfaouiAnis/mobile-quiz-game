import { useMutation } from "@tanstack/react-query";
import {
  PurchasesPackage,
  PurchasesError,
  PURCHASES_ERROR_CODE,
} from "react-native-purchases";
import {
  purchasePackage,
  restorePurchases,
  getGameEntitlement,
} from "@/src/lib/revenuecat/service";
import { useSubscriptionStore } from "@/src/stores/subscription.store";
import { useInvalidateCustomerInfo } from "./useCustomerInfo";
import { GAMES } from "@/src/lib/revenuecat/config";
import { GameId, GameEntitlement } from "@/src/lib/revenuecat/types";

export function usePurchasePackage() {
  const setEntitlements = useSubscriptionStore((s) => s.setEntitlements);
  const invalidate = useInvalidateCustomerInfo();

  return useMutation({
    mutationFn: (pkg: PurchasesPackage) => purchasePackage(pkg),
    onSuccess: (customerInfo) => {
      const entitlements = GAMES.reduce<Record<GameId, GameEntitlement>>(
        (acc, gameId) => {
          acc[gameId] = getGameEntitlement(customerInfo, gameId);
          return acc;
        },
        {} as Record<GameId, GameEntitlement>,
      );
      setEntitlements(entitlements);
      invalidate();
    },
    onError: (error: PurchasesError) => {
      if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        return;
      }
      console.error("Purchase failed:", error.message);
    },
  });
}

export function useRestorePurchases() {
  const setEntitlements = useSubscriptionStore((s) => s.setEntitlements);
  const invalidate = useInvalidateCustomerInfo();

  return useMutation({
    mutationFn: restorePurchases,
    onSuccess: (customerInfo) => {
      const entitlements = GAMES.reduce<Record<GameId, GameEntitlement>>(
        (acc, gameId) => {
          acc[gameId] = getGameEntitlement(customerInfo, gameId);
          return acc;
        },
        {} as Record<GameId, GameEntitlement>,
      );
      setEntitlements(entitlements);
      invalidate();
    },
  });
}
