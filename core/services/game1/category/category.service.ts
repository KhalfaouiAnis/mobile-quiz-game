import { httpClient } from "@/core/api/httpClient";
import { Category } from "@/core/types";

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface CategoriesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
  is_deleted?: boolean;
  sortBy?: "created_at" | "updated_at" | "name" | "order";
  sortOrder?: "asc" | "desc";
}

export async function getCategories(): Promise<CategoriesResponse> {
  const queryParams = new URLSearchParams();

  queryParams.append("page", "1");
  queryParams.append("limit", "100");

  const url = `/categories${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const response = await httpClient.get(url);
  return response.data;
}

export async function getCategoryById(
  id: number
): Promise<{ success: boolean; data: { category: Category } }> {
  const response = await httpClient.get(`/categories/${id}`);
  return response.data;
}
