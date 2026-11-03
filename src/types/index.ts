/**
 * Core Application Types for MoneyTrack
 * Phase 7 - Frontend & Backend Integration Types
 */

export type Currency = "IDR";

export type AccountType = "CASH" | "BANK" | "E_WALLET" | "OTHER";

export type TransactionType = "INCOME" | "EXPENSE";

export interface UserSession {
  id: string;
  email: string;
  name?: string | null;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  currentBalance?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: TransactionType;
  icon?: string | null;
  color?: string | null;
  isDefault?: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  type: TransactionType;
  amount: number;
  description?: string | null;
  transactionDate: string;
  account?: Account;
  category?: Category;
  createdAt: string;
  updatedAt?: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  spent?: number;
  remaining?: number;
  percentage?: number;
  month: number;
  year: number;
  category?: Category;
  createdAt: string;
  updatedAt?: string;
}

export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  netCashFlow: number;
}

export interface PaginatedResult<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CashFlowReportItem {
  month: number;
  monthName: string;
  income: number;
  expense: number;
  netCashFlow: number;
}

export interface ExpenseByCategoryReportItem {
  categoryId: string;
  categoryName: string;
  color: string | null;
  icon: string | null;
  amount: number;
  percentage: number;
}

export interface IncomeVsExpenseTrendItem {
  month: number;
  monthName: string;
  income: number;
  expense: number;
}
