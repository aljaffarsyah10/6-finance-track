import { apiClient } from "./client";
import { Category, TransactionType } from "@/types";
import { CategoryFormValues } from "@/lib/validations/category.schema";

export async function fetchCategories(type?: TransactionType): Promise<Category[]> {
  return apiClient.get<Category[]>("/api/categories", {
    params: type ? { type } : undefined,
  });
}

export async function createCategory(payload: CategoryFormValues): Promise<Category> {
  return apiClient.post<Category>("/api/categories", payload);
}

export async function updateCategory(
  id: string,
  payload: Partial<CategoryFormValues>
): Promise<Category> {
  return apiClient.put<Category>(`/api/categories/${id}`, payload);
}

export async function deleteCategory(id: string): Promise<{ id: string }> {
  return apiClient.delete<{ id: string }>(`/api/categories/${id}`);
}
