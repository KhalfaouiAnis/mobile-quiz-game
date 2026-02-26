import { useQuery } from "@tanstack/react-query";
import {
  fetchSubscriptionPackages,
  fetchUserPurchases,
} from "./subscription.service";

export const usePurchasesQuery = () => {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: fetchUserPurchases,
  });
};

export const usePackagesQuery = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: fetchSubscriptionPackages,
  });
};
