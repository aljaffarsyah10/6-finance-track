/**
 * MOCK DATA — DASHBOARD
 * NOTE: This mock data is temporary for Phase 5 frontend feature development.
 * It MUST be replaced with backend API calls in Phase 7.
 */

import { DashboardSummary } from "@/types";

export const mockDashboardSummary: DashboardSummary = {
  totalBalance: 21950000,
  monthlyIncome: 18500000,
  monthlyExpense: 1065000,
  netCashFlow: 17435000,
};

export const mockMonthlyCashFlowChart = [
  { month: "Jun", income: 14000000, expense: 7800000 },
  { month: "Jul", income: 14500000, expense: 8200000 },
  { month: "Agu", income: 15000000, expense: 9100000 },
  { month: "Sep", income: 16200000, expense: 8500000 },
  { month: "Okt", income: 15500000, expense: 8900000 },
  { month: "Nov", income: 18500000, expense: 1065000 },
];

export const mockExpenseBreakdown = [
  { name: "Tagihan & Utilitas", value: 750000, color: "#8b5cf6" },
  { name: "Hiburan & Rekreasi", value: 150000, color: "#ec4899" },
  { name: "Makanan & Minuman", value: 120000, color: "#f59e0b" },
  { name: "Transportasi", value: 45000, color: "#3b82f6" },
];
