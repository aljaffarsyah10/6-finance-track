import { apiClient } from "./client";
import {
  CashFlowReportItem,
  ExpenseByCategoryReportItem,
  IncomeVsExpenseTrendItem,
} from "@/types";

export async function fetchCashFlowReport(
  year?: number
): Promise<CashFlowReportItem[]> {
  return apiClient.get<CashFlowReportItem[]>("/api/reports/cashflow", {
    params: { year: year !== undefined ? year : undefined },
  });
}
export async function fetchExpenseReport(
  month?: number,
  year?: number
): Promise<ExpenseByCategoryReportItem[]> {
  return apiClient.get<ExpenseByCategoryReportItem[]>("/api/reports/expenses", {
    params: {
      month: month !== undefined ? month : undefined,
      year: year !== undefined ? year : undefined,
    },
  });
}

export async function fetchIncomeExpenseReport(
  year?: number
): Promise<IncomeVsExpenseTrendItem[]> {
  return apiClient.get<IncomeVsExpenseTrendItem[]>("/api/reports/income-expense", {
    params: { year: year !== undefined ? year : undefined },
  });
}
