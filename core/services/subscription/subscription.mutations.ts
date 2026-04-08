import { useMutation } from "@tanstack/react-query";
import { purchasePackage } from "./subscription.service";

export const useSubscriptionMutations = () => {
  const usePurchasePackage = useMutation({
    mutationFn: async (packageId: number) => {
      return purchasePackage(packageId);
    },
    onError: (err) => console.log(err),
  });

  return {
    usePurchasePackage,
  };
};
