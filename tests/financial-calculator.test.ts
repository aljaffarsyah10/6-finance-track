import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateAccountBalance,
  calculateNetCashFlow,
  calculateBudgetUsage,
  serializeBigInt,
} from "../src/services/financial-calculator";
import { transactionSchema } from "../src/lib/validations/transaction.schema";
import { accountSchema } from "../src/lib/validations/account.schema";
import { budgetSchema } from "../src/lib/validations/budget.schema";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "../src/lib/validations/user.schema";

describe("Financial Calculation Engine & Unit Tests", () => {
  describe("1. Balance Calculation", () => {
    it("should calculate balance correctly with initial balance, income, and expense", () => {
      // PRD Example: Initial 1.000.000 + Income 3.000.000 - Expense 1.500.000 = 2.500.000
      const balance = calculateAccountBalance(BigInt(1000000), BigInt(3000000), BigInt(1500000));
      assert.equal(balance, BigInt(2500000));
    });

    it("should handle zero initial balance", () => {
      const balance = calculateAccountBalance(BigInt(0), BigInt(5000000), BigInt(2000000));
      assert.equal(balance, BigInt(3000000));
    });

    it("should allow negative balances (overdraft / cash deficit)", () => {
      const balance = calculateAccountBalance(BigInt(500000), BigInt(0), BigInt(1200000));
      assert.equal(balance, BigInt(-700000));
    });

    it("should handle large integer numbers without precision loss", () => {
      const largeInitial = BigInt("50000000000"); // 50 Miliar
      const largeIncome = BigInt("25000000000");  // 25 Miliar
      const largeExpense = BigInt("15000000000"); // 15 Miliar
      const balance = calculateAccountBalance(largeInitial, largeIncome, largeExpense);
      assert.equal(balance, BigInt("60000000000"));
    });
  });

  describe("2. Net Cash Flow Calculation", () => {
    it("should calculate positive net cash flow (surplus)", () => {
      const net = calculateNetCashFlow(BigInt(10000000), BigInt(4000000));
      assert.equal(net, BigInt(6000000));
    });

    it("should calculate negative net cash flow (deficit)", () => {
      const net = calculateNetCashFlow(BigInt(3000000), BigInt(5500000));
      assert.equal(net, BigInt(-2500000));
    });

    it("should calculate zero net cash flow when income equals expense", () => {
      const net = calculateNetCashFlow(BigInt(5000000), BigInt(5000000));
      assert.equal(net, BigInt(0));
    });
  });

  describe("3. Budget Usage & Remaining Calculation", () => {
    it("should calculate normal budget usage (< 80% is neither warning nor over)", () => {
      const result = calculateBudgetUsage(BigInt(500000), BigInt(2000000));
      assert.equal(result.remaining, BigInt(1500000));
      assert.equal(result.percentage, 25);
      assert.equal(result.isWarning, false);
      assert.equal(result.isOver, false);
    });

    it("should flag warning when usage is >= 80% and < 100%", () => {
      const result = calculateBudgetUsage(BigInt(850000), BigInt(1000000));
      assert.equal(result.remaining, BigInt(150000));
      assert.equal(result.percentage, 85);
      assert.equal(result.isWarning, true);
      assert.equal(result.isOver, false);
    });

    it("should flag overbudget when usage is >= 100%", () => {
      const result = calculateBudgetUsage(BigInt(1200000), BigInt(1000000));
      assert.equal(result.remaining, BigInt(-200000));
      assert.equal(result.percentage, 120);
      assert.equal(result.isOver, true);
      assert.equal(result.isWarning, false);
    });

    it("should safeguard against zero division error when budget is 0", () => {
      const result = calculateBudgetUsage(BigInt(0), BigInt(0));
      assert.equal(result.remaining, BigInt(0));
      assert.equal(result.percentage, 0);
      assert.equal(result.isOver, false);
    });
  });

  describe("4. BigInt Serialization", () => {
    it("should serialize BigInt values to numbers when within safe integer limit", () => {
      const obj = { id: "tx_1", amount: BigInt(1500000) };
      const serialized = serializeBigInt(obj);
      assert.equal(serialized.amount, 1500000);
      assert.equal(typeof serialized.amount, "number");
    });
  });

  describe("5. Zod Schema Validation Rules", () => {
    it("should reject negative or zero transaction amounts", () => {
      const invalidTx = {
        type: "EXPENSE",
        amount: -5000,
        accountId: "acc_1",
        categoryId: "cat_1",
        transactionDate: "2026-11-03",
      };
      const result = transactionSchema.safeParse(invalidTx);
      assert.equal(result.success, false);
    });

    it("should reject non-integer transaction amounts", () => {
      const floatTx = {
        type: "EXPENSE",
        amount: 50000.75,
        accountId: "acc_1",
        categoryId: "cat_1",
        transactionDate: "2026-11-03",
      };
      const result = transactionSchema.safeParse(floatTx);
      assert.equal(result.success, false);
    });

    it("should accept valid transaction payload", () => {
      const validTx = {
        type: "INCOME",
        amount: 2500000,
        accountId: "acc_1",
        categoryId: "cat_1",
        transactionDate: "2026-11-03",
        description: "Gaji bulanan",
      };
      const result = transactionSchema.safeParse(validTx);
      assert.equal(result.success, true);
    });

    it("should validate account creation initialBalance >= 0", () => {
      const validAcc = {
        name: "Bank BCA",
        type: "BANK",
        initialBalance: 1000000,
      };
      assert.equal(accountSchema.safeParse(validAcc).success, true);

      const invalidAcc = {
        name: "Bank BCA",
        type: "BANK",
        initialBalance: -500,
      };
      assert.equal(accountSchema.safeParse(invalidAcc).success, false);
    });

    it("should validate budget month range 1-12", () => {
      const validBudget = {
        categoryId: "cat_1",
        amount: 1000000,
        month: 11,
        year: 2026,
      };
      assert.equal(budgetSchema.safeParse(validBudget).success, true);

      const invalidBudget = {
        categoryId: "cat_1",
        amount: 1000000,
        month: 13,
        year: 2026,
      };
      assert.equal(budgetSchema.safeParse(invalidBudget).success, false);
    });
  });

  describe("6. CSV Security & Sanitization", () => {
    function sanitizeCsvCell(value: unknown): string {
      if (value === null || value === undefined) {
        return '""';
      }
      let str = String(value).trim();
      if (/^[=+\-@\t\r]/.test(str)) {
        str = `'${str}`;
      }
      str = str.replace(/"/g, '""');
      return `"${str}"`;
    }

    it("should neutralize formula injection characters (=, +, -, @, \\t, \\r)", () => {
      assert.equal(sanitizeCsvCell("=SUM(A1:A10)"), '"\'=SUM(A1:A10)"');
      assert.equal(sanitizeCsvCell("+cmd|' /C calc'!A0"), '"\'+cmd|\' /C calc\'!A0"');
      assert.equal(sanitizeCsvCell("-1234"), '"\'-1234"');
      assert.equal(sanitizeCsvCell("@alert(1)"), '"\'@alert(1)"');
    });

    it("should properly escape double quotes", () => {
      assert.equal(sanitizeCsvCell('Beli "Kopi" Enak'), '"Beli ""Kopi"" Enak"');
    });

    it("should handle null or undefined safely", () => {
      assert.equal(sanitizeCsvCell(null), '""');
      assert.equal(sanitizeCsvCell(undefined), '""');
    });
  });

  describe("7. User Profile & Password Change Schema Validation", () => {
    it("should validate profile update name length", () => {
      assert.equal(updateProfileSchema.safeParse({ name: "A" }).success, false);
      assert.equal(updateProfileSchema.safeParse({ name: "Budi Santoso" }).success, true);
    });

    it("should validate password change minimum length and confirmation match", () => {
      // Too short
      assert.equal(
        changePasswordSchema.safeParse({
          currentPassword: "oldpassword123",
          newPassword: "short",
          confirmNewPassword: "short",
        }).success,
        false
      );

      // Mismatched
      assert.equal(
        changePasswordSchema.safeParse({
          currentPassword: "oldpassword123",
          newPassword: "newpassword123",
          confirmNewPassword: "differentpassword123",
        }).success,
        false
      );

      // Valid
      assert.equal(
        changePasswordSchema.safeParse({
          currentPassword: "oldpassword123",
          newPassword: "newpassword123",
          confirmNewPassword: "newpassword123",
        }).success,
        true
      );
    });
  });
});
