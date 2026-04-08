import { httpClient } from "@/core/api/httpClient";
import { ApiResponse, Package, User, UserPurchase } from "@/core/types";

export const fetchUserPurchases = async () => {
  const { data } = await httpClient.get<
    ApiResponse<(Package & UserPurchase)[]>
  >("/subscriptions/purchases");
  return data;
};

export const fetchSubscriptionPackages = async () => {
  const { data } = await httpClient.get<ApiResponse<Package[]>>(
    "/subscriptions/packages",
  );

  return data;
};

export const purchasePackage = async (packageId: number) => {
  const { data } = await httpClient.post<
    ApiResponse<{
      purchase: UserPurchase;
      user: User;
      package: Package;
    }>
  >("/subscriptions/purchase", { packageId });

  return data;
};
