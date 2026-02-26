import { useQuery } from "@tanstack/react-query";
import {
  getSubcategoriesByCategoryId,
  getSubcategoryById,
} from "./subcategory.service";

export const useSubCategoriesQuery = (activeCatId: number | null) => {
  return useQuery({
    queryKey: ["game1__subcategories", activeCatId],
    queryFn: async () => await getSubcategoriesByCategoryId(activeCatId),
    staleTime: 1000 * 60 * 60,
    enabled: !!activeCatId,
  });
};

export const useSubCategoryDetailQuery = (subcategory_id: number) => {
  return useQuery({
    queryKey: ["game1__subcategory", "detail", subcategory_id],
    queryFn: () => getSubcategoryById(subcategory_id),
    staleTime: 1000 * 60 * 2,
    enabled: !!subcategory_id
  });
};
