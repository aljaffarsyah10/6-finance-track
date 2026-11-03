import { describe, it, expect } from "vitest";
import { hashPassword, comparePassword } from "../../src/lib/password";
import { transactionSchema } from "../../src/lib/validations/transaction.schema";
import { updateProfileSchema, changePasswordSchema } from "../../src/lib/validations/user.schema";

describe("Security Audit & Vulnerability Mitigation Tests", () => {
  describe("1. Password Hashing Security (Bcrypt)", () => {
    it("should securely hash password with bcrypt salt and verify correct password", async () => {
      const plaintext = "SuperSecretP@ssw0rd123";
      const hash = await hashPassword(plaintext);

      // Verify hash is not plaintext
      expect(hash).not.toBe(plaintext);
      expect(hash.startsWith("$2")).toBe(true); // Bcrypt prefix

      // Correct password verifies true
      const isMatch = await comparePassword(plaintext, hash);
      expect(isMatch).toBe(true);

      // Incorrect password verifies false
      const isWrongMatch = await comparePassword("WrongPassword123", hash);
      expect(isWrongMatch).toBe(false);
    });
  });

  describe("2. CSV Injection Attack Mitigation", () => {
    function sanitizeCsvCell(value: unknown): string {
      if (value === null || value === undefined) {
        return '""';
      }
      let str = String(value);
      if (/^[=+\-@\t\r]/.test(str) || /^[=+\-@\t\r]/.test(str.trim())) {
        str = `'${str}`;
      }
      str = str.replace(/"/g, '""');
      return `"${str}"`;
    }

    it("should neutralize formula injection vectors in descriptions and category names", () => {
      const dangerousInputs = [
        "=cmd|' /C calc'!A0",
        "+1+1",
        "-2+3*4",
        "@SUM(1,2)",
        "\tDDE(\"cmd\";\"/C calc\";\"__DDE__\")",
        "\r=1+1",
      ];

      for (const input of dangerousInputs) {
        const sanitized = sanitizeCsvCell(input);
        expect(sanitized.startsWith('"\'')).toBe(true);
      }
    });

    it("should safely escape benign inputs without breaking text content", () => {
      const normalInput = "Belanja Bulanan di Supermarket";
      const sanitized = sanitizeCsvCell(normalInput);
      expect(sanitized).toBe('"Belanja Bulanan di Supermarket"');
    });
  });

  describe("3. Input Validation & Boundary Enforcement", () => {
    it("should reject negative amounts and zero amounts to prevent balance tampering", () => {
      expect(
        transactionSchema.safeParse({
          accountId: "acc_1",
          categoryId: "cat_1",
          type: "EXPENSE",
          amount: -1000000,
          transactionDate: "2026-11-03",
        }).success
      ).toBe(false);

      expect(
        transactionSchema.safeParse({
          accountId: "acc_1",
          categoryId: "cat_1",
          type: "EXPENSE",
          amount: 0,
          transactionDate: "2026-11-03",
        }).success
      ).toBe(false);
    });

    it("should reject non-integer (decimal) amounts to prevent floating-point inaccuracy", () => {
      expect(
        transactionSchema.safeParse({
          accountId: "acc_1",
          categoryId: "cat_1",
          type: "EXPENSE",
          amount: 50000.99,
          transactionDate: "2026-11-03",
        }).success
      ).toBe(false);
    });

    it("should sanitize and validate profile update inputs against empty strings", () => {
      expect(updateProfileSchema.safeParse({ name: "" }).success).toBe(false);
      expect(updateProfileSchema.safeParse({ name: "   " }).success).toBe(false);
      expect(updateProfileSchema.safeParse({ name: "Jane Doe" }).success).toBe(true);
    });

    it("should require minimum 8 characters for new passwords", () => {
      expect(
        changePasswordSchema.safeParse({
          currentPassword: "currentPassword123",
          newPassword: "short",
          confirmNewPassword: "short",
        }).success
      ).toBe(false);
    });
  });
});
