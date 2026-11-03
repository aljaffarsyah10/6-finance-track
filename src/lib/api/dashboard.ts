import { apiClient } from "./client";
import {
  DashboardSummary,
  Transaction,
  ExpenseByCategoryReportItem,
} from "@/types";

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  return apiClient.get<DashboardSummary>("/api/dashboard/summary");
}

export async function fetchRecentTransactions(limit = 5): Promise<Transaction[]> {
  return apiClient.get<Transaction[]>("/api/dashboard/recent-transactions", {
    params: { limit },
  });
}

export async function fetchExpenseBreakdown(
  month?: number,
  year?: number
): Promise<ExpenseByCategoryReportItem[]> {
  return apiClient.get<ExpenseByCategoryReportItem[]>(
    "/api/dashboard/expense-breakdown",
    {
      params: {
        month: month !== undefined ? month : undefined,
        year: year !== undefined ? year : undefined,
      },
    }
  );
}
