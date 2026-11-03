import { apiClient } from "./client";
import { Account } from "@/types";
import { AccountFormValues } from "@/lib/validations/account.schema";

export async function fetchAccounts(): Promise<Account[]> {
  return apiClient.get<Account[]>("/api/accounts");
}

export async function createAccount(payload: AccountFormValues): Promise<Account> {
  return apiClient.post<Account>("/api/accounts", payload);
}

export async function updateAccount(
  id: string,
  payload: Partial<AccountFormValues>
): Promise<Account> {
  return apiClient.put<Account>(`/api/accounts/${id}`, payload);
}

export async function deleteAccount(id: string): Promise<{ id: string }> {
  return apiClient.delete<{ id: string }>(`/api/accounts/${id}`);
}
