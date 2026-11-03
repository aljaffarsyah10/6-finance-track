import { apiClient } from "./client";
import { Budget } from "@/types";
import { BudgetFormValues } from "@/lib/validations/budget.schema";

export async function fetchBudgets(month?: number, year?: number): Promise<Budget[]> {
  return apiClient.get<Budget[]>("/api/budgets", {
    params: {
      month: month !== undefined ? month : undefined,
      year: year !== undefined ? year : undefined,
    },
  });
}

export async function createBudget(payload: BudgetFormValues): Promise<Budget> {
  return apiClient.post<Budget>("/api/budgets", payload);
}

export async function updateBudget(
  id: string,
  payload: Partial<BudgetFormValues>
): Promise<Budget> {
  return apiClient.put<Budget>(`/api/budgets/${id}`, payload);
}

export async function deleteBudget(id: string): Promise<{ id: string }> {
  return apiClient.delete<{ id: string }>(`/api/budgets/${id}`);
}
