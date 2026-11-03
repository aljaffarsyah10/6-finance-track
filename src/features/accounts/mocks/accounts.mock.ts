/**
 * MOCK DATA — ACCOUNTS
 * NOTE: This mock data is temporary for Phase 5 frontend feature development.
 * It MUST be replaced with backend API calls in Phase 7.
 */

import { Account } from "@/types";

export const mockAccounts: Account[] = [
  {
    id: "acc_1",
    userId: "user_demo",
    name: "Kas Dompet (Cash)",
    type: "CASH",
    initialBalance: 500000,
    currentBalance: 420000,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "acc_2",
    userId: "user_demo",
    name: "Bank BCA",
    type: "BANK",
    initialBalance: 12000000,
    currentBalance: 16500000,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "acc_3",
    userId: "user_demo",
    name: "Bank Mandiri",
    type: "BANK",
    initialBalance: 5000000,
    currentBalance: 4850000,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "acc_4",
    userId: "user_demo",
    name: "GoPay / OVO",
    type: "E_WALLET",
    initialBalance: 300000,
    currentBalance: 180000,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];
