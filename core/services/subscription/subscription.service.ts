import { httpClient } from "@/core/api/httpClient";
import { ApiResponse, Package, UserPurchase } from "@/core/types";

export const fetchUserPurchases = async () => {
  return httpClient.get<ApiResponse<(Package & UserPurchase)[]>>(
    "/subscriptions/purchases",
  );
};

export const fetchSubscriptionPackages = async () => {
  return httpClient.get<ApiResponse<Package[]>>("/subscriptions/packages");
};

export const purchasePackage = async (packageId: number) => {
  return httpClient.post<ApiResponse<Package[]>>(
    "/subscriptions/purchase",
    packageId,
  );
};
