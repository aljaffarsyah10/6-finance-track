/**
 * MOCK DATA — BUDGETS
 * NOTE: This mock data is temporary for Phase 5 frontend feature development.
 * It MUST be replaced with backend API calls in Phase 7.
 */

import { Budget } from "@/types";
import { mockCategories } from "@/features/categories/mocks/categories.mock";

export const mockBudgets: Budget[] = [
  {
    id: "bgt_1",
    userId: "user_demo",
    categoryId: "cat_exp_1",
    amount: 3000000,
    spent: 120000,
    remaining: 2880000,
    percentage: 4,
    month: 11,
    year: 2026,
    category: mockCategories.find((c) => c.id === "cat_exp_1"),
    createdAt: "2026-11-01T00:00:00.000Z",
  },
  {
    id: "bgt_2",
    userId: "user_demo",
    categoryId: "cat_exp_2",
    amount: 1500000,
    spent: 1300000,
    remaining: 200000,
    percentage: 86.7,
    month: 11,
    year: 2026,
    category: mockCategories.find((c) => c.id === "cat_exp_2"),
    createdAt: "2026-11-01T00:00:00.000Z",
  },
  {
    id: "bgt_3",
    userId: "user_demo",
    categoryId: "cat_exp_3",
    amount: 1000000,
    spent: 750000,
    remaining: 250000,
    percentage: 75,
    month: 11,
    year: 2026,
    category: mockCategories.find((c) => c.id === "cat_exp_3"),
    createdAt: "2026-11-01T00:00:00.000Z",
  },
  {
    id: "bgt_4",
    userId: "user_demo",
    categoryId: "cat_exp_4",
    amount: 500000,
    spent: 550000,
    remaining: -50000,
    percentage: 110,
    month: 11,
    year: 2026,
    category: mockCategories.find((c) => c.id === "cat_exp_4"),
    createdAt: "2026-11-01T00:00:00.000Z",
  },
];

