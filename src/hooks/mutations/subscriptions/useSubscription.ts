import { api } from "@/src/lib/api";
import { UserPurchase } from "@/src/types/index.types";
import { useMutation } from "@tanstack/react-query";

export function usePurchasePackage() {
  return useMutation({
    mutationFn: async (packageId: number) => {
      const { data } = await api.post<UserPurchase>("subscriptions/purchase", {
        packageId,
      });
      return data;
    },
  });
}
