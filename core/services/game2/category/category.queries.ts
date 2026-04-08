import { getGame2Categories } from "@/core/services/game2/category/category.service";
import { useQuery } from "@tanstack/react-query";

export const useGame2CategoriesQuery = () => {
  return useQuery({
    queryKey: ["game2__categories"],
    queryFn: getGame2Categories,
    staleTime: 1000 * 60 * 60,
  });
};
