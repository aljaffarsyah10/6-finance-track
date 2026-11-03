import { apiClient } from "./client";
import { Transaction, TransactionType, PaginatedResult } from "@/types";
import { TransactionFormValues } from "@/lib/validations/transaction.schema";

export interface TransactionFilterParams {
  page?: number;
  limit?: number;
  accountId?: string;
  categoryId?: string;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: "transactionDate" | "amount" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export async function fetchTransactions(
  params?: TransactionFilterParams
): Promise<PaginatedResult<Transaction>> {
  return apiClient.get<PaginatedResult<Transaction>>("/api/transactions", {
    params: params as Record<string, string | number | boolean | undefined | null>,
  });
}

export async function createTransaction(
  payload: TransactionFormValues
): Promise<Transaction> {
  return apiClient.post<Transaction>("/api/transactions", payload);
}

export async function updateTransaction(
  id: string,
  payload: Partial<TransactionFormValues>
): Promise<Transaction> {
  return apiClient.put<Transaction>(`/api/transactions/${id}`, payload);
}

export async function deleteTransaction(id: string): Promise<{ id: string }> {
  return apiClient.delete<{ id: string }>(`/api/transactions/${id}`);
}
