/**
 * MOCK DATA — CATEGORIES
 * NOTE: This mock data is temporary for Phase 5 frontend feature development.
 * It MUST be replaced with backend API calls in Phase 7.
 */

import { Category } from "@/types";

export const mockCategories: Category[] = [
  // Expense categories
  {
    id: "cat_exp_1",
    userId: "user_demo",
    name: "Makanan & Minuman",
    type: "EXPENSE",
    icon: "Utensils",
    color: "#f59e0b",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_exp_2",
    userId: "user_demo",
    name: "Transportasi",
    type: "EXPENSE",
    icon: "Car",
    color: "#3b82f6",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_exp_3",
    userId: "user_demo",
    name: "Tagihan & Utilitas",
    type: "EXPENSE",
    icon: "Zap",
    color: "#8b5cf6",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_exp_4",
    userId: "user_demo",
    name: "Hiburan & Rekreasi",
    type: "EXPENSE",
    icon: "Film",
    color: "#ec4899",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_exp_5",
    userId: "user_demo",
    name: "Kesehatan & Kebugaran",
    type: "EXPENSE",
    icon: "HeartPulse",
    color: "#ef4444",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  // Income categories
  {
    id: "cat_inc_1",
    userId: "user_demo",
    name: "Gaji Utama",
    type: "INCOME",
    icon: "Briefcase",
    color: "#10b981",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_inc_2",
    userId: "user_demo",
    name: "Bonus & THR",
    type: "INCOME",
    icon: "Gift",
    color: "#06b6d4",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_inc_3",
    userId: "user_demo",
    name: "Proyek Freelance",
    type: "INCOME",
    icon: "Laptop",
    color: "#14b8a6",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_inc_4",
    userId: "user_demo",
    name: "Investasi & Dividen",
    type: "INCOME",
    icon: "TrendingUp",
    color: "#84cc16",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];
