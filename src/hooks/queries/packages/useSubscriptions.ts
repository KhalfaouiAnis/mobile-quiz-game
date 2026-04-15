import { api } from "@/src/lib/api";
import { SubscriptionResponse } from "@/src/types/index.types";
import { useQuery } from "@tanstack/react-query";

export const useSubscriptionsQuery = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const { data } = await api.get<SubscriptionResponse>("/subscriptions/me");
      return data;
    },
    staleTime: 5 * 60 * 1_000,
  });
};
