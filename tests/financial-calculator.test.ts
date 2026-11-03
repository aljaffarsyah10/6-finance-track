import { describe, it, expect } from "vitest";
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
      expect(balance).toBe(BigInt(2500000));
    });

    it("should handle zero initial balance", () => {
      const balance = calculateAccountBalance(BigInt(0), BigInt(5000000), BigInt(2000000));
      expect(balance).toBe(BigInt(3000000));
    });

    it("should allow negative balances (overdraft / cash deficit)", () => {
      const balance = calculateAccountBalance(BigInt(500000), BigInt(0), BigInt(1200000));
      expect(balance).toBe(BigInt(-700000));
    });

    it("should handle large integer numbers without precision loss", () => {
      const largeInitial = BigInt("50000000000"); // 50 Miliar
      const largeIncome = BigInt("25000000000");  // 25 Miliar
      const largeExpense = BigInt("15000000000"); // 15 Miliar
      const balance = calculateAccountBalance(largeInitial, largeIncome, largeExpense);
      expect(balance).toBe(BigInt("60000000000"));
    });
  });

  describe("2. Net Cash Flow Calculation", () => {
    it("should calculate positive net cash flow (surplus)", () => {
      const net = calculateNetCashFlow(BigInt(10000000), BigInt(4000000));
      expect(net).toBe(BigInt(6000000));
    });

    it("should calculate negative net cash flow (deficit)", () => {
      const net = calculateNetCashFlow(BigInt(3000000), BigInt(5500000));
      expect(net).toBe(BigInt(-2500000));
    });

    it("should calculate zero net cash flow when income equals expense", () => {
      const net = calculateNetCashFlow(BigInt(5000000), BigInt(5000000));
      expect(net).toBe(BigInt(0));
    });
  });

  describe("3. Budget Usage & Remaining Calculation", () => {
    it("should calculate normal budget usage (< 80% is neither warning nor over)", () => {
      const result = calculateBudgetUsage(BigInt(500000), BigInt(2000000));
      expect(result.remaining).toBe(BigInt(1500000));
      expect(result.percentage).toBe(25);
      expect(result.isWarning).toBe(false);
      expect(result.isOver).toBe(false);
    });

    it("should flag warning when usage is >= 80% and < 100%", () => {
      const result = calculateBudgetUsage(BigInt(850000), BigInt(1000000));
      expect(result.remaining).toBe(BigInt(150000));
      expect(result.percentage).toBe(85);
      expect(result.isWarning).toBe(true);
      expect(result.isOver).toBe(false);
    });

    it("should flag overbudget when usage is >= 100%", () => {
      const result = calculateBudgetUsage(BigInt(1200000), BigInt(1000000));
      expect(result.remaining).toBe(BigInt(-200000));
      expect(result.percentage).toBe(120);
      expect(result.isWarning).toBe(false);
      expect(result.isOver).toBe(true);
    });

    it("should safeguard against zero division error when budget is 0", () => {
      const result = calculateBudgetUsage(BigInt(500000), BigInt(0));
      expect(result.remaining).toBe(BigInt(-500000));
      expect(result.percentage).toBe(100);
      expect(result.isWarning).toBe(false);
      expect(result.isOver).toBe(true);
    });
  });

  describe("4. BigInt Serialization", () => {
    it("should serialize BigInt values to numbers when within safe integer limit", () => {
      const rawObject = {
        id: "acc_1",
        name: "BCA",
        initialBalance: BigInt(5000000),
        nested: {
          amount: BigInt(250000),
          label: "sample",
        },
        items: [BigInt(100), BigInt(200)],
      };

      const serialized = serializeBigInt(rawObject);
      expect(serialized).toEqual({
        id: "acc_1",
        name: "BCA",
        initialBalance: 5000000,
        nested: {
          amount: 250000,
          label: "sample",
        },
        items: [100, 200],
      });
    });
  });

  describe("5. Zod Schema Validation Rules", () => {
    it("should reject negative or zero transaction amounts", () => {
      const invalidPayloadZero = {
        accountId: "acc_123",
        categoryId: "cat_123",
        type: "EXPENSE",
        amount: 0,
        transactionDate: "2026-11-03",
        description: "Zero test",
      };
      expect(transactionSchema.safeParse(invalidPayloadZero).success).toBe(false);

      const invalidPayloadNegative = {
        ...invalidPayloadZero,
        amount: -50000,
      };
      expect(transactionSchema.safeParse(invalidPayloadNegative).success).toBe(false);
    });

    it("should reject non-integer transaction amounts", () => {
      const invalidPayloadFloat = {
        accountId: "acc_123",
        categoryId: "cat_123",
        type: "EXPENSE",
        amount: 15000.5,
        transactionDate: "2026-11-03",
        description: "Float test",
      };
      expect(transactionSchema.safeParse(invalidPayloadFloat).success).toBe(false);
    });

    it("should accept valid transaction payload", () => {
      const validPayload = {
        accountId: "acc_123",
        categoryId: "cat_123",
        type: "INCOME",
        amount: 5000000,
        transactionDate: "2026-11-03",
        description: "Gaji Bulanan",
      };
      expect(transactionSchema.safeParse(validPayload).success).toBe(true);
    });

    it("should validate account creation initialBalance >= 0", () => {
      const validAcc = {
        name: "Bank BCA",
        type: "BANK",
        initialBalance: 1000000,
      };
      expect(accountSchema.safeParse(validAcc).success).toBe(true);

      const invalidAcc = {
        name: "Bank BCA",
        type: "BANK",
        initialBalance: -500,
      };
      expect(accountSchema.safeParse(invalidAcc).success).toBe(false);
    });

    it("should validate budget month range 1-12", () => {
      const validBudget = {
        categoryId: "cat_1",
        amount: 1000000,
        month: 11,
        year: 2026,
      };
      expect(budgetSchema.safeParse(validBudget).success).toBe(true);

      const invalidBudget = {
        categoryId: "cat_1",
        amount: 1000000,
        month: 13,
        year: 2026,
      };
      expect(budgetSchema.safeParse(invalidBudget).success).toBe(false);
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
      expect(sanitizeCsvCell("=SUM(A1:A10)")).toBe('"\'=SUM(A1:A10)"');
      expect(sanitizeCsvCell("+cmd|' /C calc'!A0")).toBe('"\'+cmd|\' /C calc\'!A0"');
      expect(sanitizeCsvCell("-1234")).toBe('"\'-1234"');
      expect(sanitizeCsvCell("@alert(1)")).toBe('"\'@alert(1)"');
    });

    it("should properly escape double quotes", () => {
      expect(sanitizeCsvCell('Beli "Kopi" Enak')).toBe('"Beli ""Kopi"" Enak"');
    });

    it("should handle null or undefined safely", () => {
      expect(sanitizeCsvCell(null)).toBe('""');
      expect(sanitizeCsvCell(undefined)).toBe('""');
    });
  });

  describe("7. User Profile & Password Change Schema Validation", () => {
    it("should validate profile update name length", () => {
      expect(updateProfileSchema.safeParse({ name: "A" }).success).toBe(false);
      expect(updateProfileSchema.safeParse({ name: "Budi Santoso" }).success).toBe(true);
    });

    it("should validate password change minimum length and confirmation match", () => {
      // Too short
      expect(
        changePasswordSchema.safeParse({
          currentPassword: "oldpassword123",
          newPassword: "short",
          confirmNewPassword: "short",
        }).success
      ).toBe(false);

      // Mismatched
      expect(
        changePasswordSchema.safeParse({
          currentPassword: "oldpassword123",
          newPassword: "newpassword123",
          confirmNewPassword: "differentpassword123",
        }).success
      ).toBe(false);

      // Valid
      expect(
        changePasswordSchema.safeParse({
          currentPassword: "oldpassword123",
          newPassword: "newpassword123",
          confirmNewPassword: "newpassword123",
        }).success
      ).toBe(true);
    });
  });
});
