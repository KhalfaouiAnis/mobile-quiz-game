import {
  getCategories,
  getCategoryById,
} from "@/core/services/game1/category.service";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["game1__categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });
};

export const useCategoryDetailQuery = (category_id: number) => {
  return useQuery({
    queryKey: ["game1__category", "detail", category_id],
    queryFn: () => getCategoryById(category_id),
    staleTime: 1000 * 60 * 2,
  });
};
