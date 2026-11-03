import { describe, it, expect } from "vitest";
import {
  calculateAccountBalance,
  calculateNetCashFlow,
  calculateBudgetUsage,
} from "../../src/services/financial-calculator";

describe("Integration Logic & Multi-Tenancy Scenarios", () => {
  describe("1. Multi-Tenant User Isolation Rules", () => {
    it("should strictly scope account balance calculations per user", () => {
      // User A data
      const userA_initial = BigInt(1000000);
      const userA_income = BigInt(2000000);
      const userA_expense = BigInt(500000);
      const userA_balance = calculateAccountBalance(userA_initial, userA_income, userA_expense);

      // User B data (separate tenant)
      const userB_initial = BigInt(5000000);
      const userB_income = BigInt(1000000);
      const userB_expense = BigInt(3000000);
      const userB_balance = calculateAccountBalance(userB_initial, userB_income, userB_expense);

      // Ensure no crosstalk between tenants
      expect(userA_balance).toBe(BigInt(2500000));
      expect(userB_balance).toBe(BigInt(3000000));
      expect(userA_balance).not.toBe(userB_balance);
    });
  });

  describe("2. End-to-End Financial Flow Simulation", () => {
    it("should accurately reflect wallet balance after a series of diverse transactions", () => {
      let walletBalance = BigInt(0); // Starting with 0

      // Step 1: Initial Deposit (Cash)
      const initialDeposit = BigInt(5000000); // +5.000.000
      walletBalance = calculateAccountBalance(walletBalance, initialDeposit, BigInt(0));
      expect(walletBalance).toBe(BigInt(5000000));

      // Step 2: Salary received
      const salary = BigInt(15000000); // +15.000.000
      walletBalance = calculateAccountBalance(walletBalance, salary, BigInt(0));
      expect(walletBalance).toBe(BigInt(20000000));

      // Step 3: Rent payment
      const rent = BigInt(4500000); // -4.500.000
      walletBalance = calculateAccountBalance(walletBalance, BigInt(0), rent);
      expect(walletBalance).toBe(BigInt(15500000));

      // Step 4: Groceries
      const groceries = BigInt(2500000); // -2.500.000
      walletBalance = calculateAccountBalance(walletBalance, BigInt(0), groceries);
      expect(walletBalance).toBe(BigInt(13000000));

      // Net cash flow of the month (excluding initial deposit)
      const totalIncome = salary;
      const totalExpense = rent + groceries;
      const netCashFlow = calculateNetCashFlow(totalIncome, totalExpense);
      expect(netCashFlow).toBe(BigInt(8000000)); // +8.000.000 surplus
    });

    it("should correctly warn and flag budget breaches over multiple expense entries", () => {
      const budgetLimit = BigInt(3000000); // Budget Rp 3.000.000 for Dining

      // Expense 1: Rp 1.500.000 (50% -> Normal)
      const step1 = calculateBudgetUsage(BigInt(1500000), budgetLimit);
      expect(step1.percentage).toBe(50);
      expect(step1.isWarning).toBe(false);
      expect(step1.isOver).toBe(false);
      expect(step1.remaining).toBe(BigInt(1500000));

      // Expense 2: Add Rp 1.000.000 -> Total Rp 2.500.000 (83.3% -> Warning)
      const step2 = calculateBudgetUsage(BigInt(2500000), budgetLimit);
      expect(step2.percentage).toBe(83.3);
      expect(step2.isWarning).toBe(true);
      expect(step2.isOver).toBe(false);
      expect(step2.remaining).toBe(BigInt(500000));

      // Expense 3: Add Rp 800.000 -> Total Rp 3.300.000 (110% -> Over Budget)
      const step3 = calculateBudgetUsage(BigInt(3300000), budgetLimit);
      expect(step3.percentage).toBe(110);
      expect(step3.isWarning).toBe(false);
      expect(step3.isOver).toBe(true);
      expect(step3.remaining).toBe(BigInt(-300000));
    });
  });
});
