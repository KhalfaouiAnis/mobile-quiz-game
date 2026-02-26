import { useMutation } from "@tanstack/react-query";
import { purchasePackage } from "./subscription.service";

export const usePurchasePackage = () => {
  const mutation = useMutation({
    mutationFn: async (packageId: number) => {
      const { data } = await purchasePackage(packageId);
      return data.data;
    },
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  return { ...mutation };
};
