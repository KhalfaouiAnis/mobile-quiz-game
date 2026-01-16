import { useQuery } from "@tanstack/react-query";
import {
  getSubcategoriesByCategoryId,
  getSubcategoryById,
} from "./subcategory.service";
import { useGameOneCategoryStore } from "@/core/store/category.store";

export const useSubCategoriesQuery = () => {
  const { selectedCategoryId } = useGameOneCategoryStore();
  return useQuery({
    queryKey: ["game1__subcategories", selectedCategoryId],
    queryFn: () => getSubcategoriesByCategoryId(selectedCategoryId),
    staleTime: 1000 * 60 * 60,
  });
};

export const useSubCategoryDetailQuery = (subcategory_id: number) => {
  return useQuery({
    queryKey: ["game1__subcategory", "detail", subcategory_id],
    queryFn: () => getSubcategoryById(subcategory_id),
    staleTime: 1000 * 60 * 2,
  });
};
