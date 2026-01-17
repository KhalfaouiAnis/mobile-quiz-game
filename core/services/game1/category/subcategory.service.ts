import { httpClient } from "@/core/api/httpClient";
import { Category } from "@/core/types";

export interface SubCategoryByCategory {
  sub_category_id: number;
  category_id: number;
  name: string;
  image_url: string;
  order?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_deleted: boolean;
}

export interface SubCategoriesByCategoryResponse {
  success: boolean;
  message: string;
  data: {
    subcategories: SubCategoryByCategory[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface SubCategoriesByCategoryQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
  is_deleted?: boolean;
  sortBy?: "created_at" | "updated_at" | "name" | "order";
  sortOrder?: "asc" | "desc";
}

export async function getSubcategoriesByCategoryId(
  categoryId: number | undefined,
): Promise<SubCategoriesByCategoryResponse> {
  const queryParams = new URLSearchParams();

  queryParams.append("page", "1");
  queryParams.append("limit", "100");

  const url = `/subcategories/category/${categoryId}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const response = await httpClient.get(url);
  return response.data;
}

export async function getSubcategoryById(
  subcategory_id: number,
): Promise<{ success: boolean; data: { subcategory: SubCategoryByCategory } }> {
  const response = await httpClient.get(`/subcategories/${subcategory_id}`);
  return response.data;
}
