import {
  TransactionRepository,
  TransactionFilterOptions,
} from "@/repositories/transaction.repository";
import { AccountRepository } from "@/repositories/account.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import { serializeBigInt } from "./financial-calculator";
import { TransactionType } from "@prisma/client";

export class TransactionService {
  static async getTransactions(userId: string, options: TransactionFilterOptions = {}) {
    const result = await TransactionRepository.findManyByUser(userId, options);
    return serializeBigInt(result);
  }

  static async getTransactionById(id: string, userId: string) {
    const tx = await TransactionRepository.findById(id, userId);
    if (!tx) {
      throw new Error("Transaksi tidak ditemukan atau bukan milik Anda.");
    }
    return serializeBigInt(tx);
  }

  static async createTransaction(
    userId: string,
    data: {
      accountId: string;
      categoryId: string;
      type: TransactionType;
      amount: number;
      transactionDate: string;
      description?: string;
    }
  ) {
    // 1. Verify account ownership
    const account = await AccountRepository.findById(data.accountId, userId);
    if (!account) {
      throw new Error("Akun keuangan tidak valid atau bukan milik Anda.");
    }

    // 2. Verify category ownership and type compatibility
    const category = await CategoryRepository.findById(data.categoryId, userId);
    if (!category) {
      throw new Error("Kategori tidak valid atau bukan milik Anda.");
    }

    if (category.type !== data.type) {
      throw new Error(
        `Tipe kategori (${category.type}) tidak cocok dengan tipe transaksi (${data.type}).`
      );
    }

    // 3. Amount positive check
    if (data.amount <= 0) {
      throw new Error("Nominal transaksi harus lebih dari 0.");
    }

    const tx = await TransactionRepository.create({
      userId,
      accountId: data.accountId,
      categoryId: data.categoryId,
      type: data.type,
      amount: BigInt(data.amount),
      transactionDate: new Date(data.transactionDate),
      description: data.description,
    });

    return serializeBigInt(tx);
  }

  static async updateTransaction(
    id: string,
    userId: string,
    data: {
      accountId?: string;
      categoryId?: string;
      type?: TransactionType;
      amount?: number;
      transactionDate?: string;
      description?: string;
    }
  ) {
    const existing = await TransactionRepository.findById(id, userId);
    if (!existing) {
      throw new Error("Transaksi tidak ditemukan atau bukan milik Anda.");
    }

    // If accountId is being changed, verify ownership
    if (data.accountId && data.accountId !== existing.accountId) {
      const account = await AccountRepository.findById(data.accountId, userId);
      if (!account) {
        throw new Error("Akun keuangan tidak valid atau bukan milik Anda.");
      }
    }

    // If categoryId or type is being changed, verify ownership & compatibility
    const targetType = data.type || existing.type;
    const targetCatId = data.categoryId || existing.categoryId;

    const category = await CategoryRepository.findById(targetCatId, userId);
    if (!category) {
      throw new Error("Kategori tidak valid atau bukan milik Anda.");
    }

    if (category.type !== targetType) {
      throw new Error(
        `Tipe kategori (${category.type}) tidak cocok dengan tipe transaksi (${targetType}).`
      );
    }

    const updated = await TransactionRepository.update(id, {
      ...(data.accountId ? { accountId: data.accountId } : {}),
      ...(data.categoryId ? { categoryId: data.categoryId } : {}),
      ...(data.type ? { type: data.type } : {}),
      ...(data.amount ? { amount: BigInt(data.amount) } : {}),
      ...(data.transactionDate ? { transactionDate: new Date(data.transactionDate) } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
    });

    return serializeBigInt(updated);
  }

  static async deleteTransaction(id: string, userId: string) {
    const existing = await TransactionRepository.findById(id, userId);
    if (!existing) {
      throw new Error("Transaksi tidak ditemukan atau bukan milik Anda.");
    }

    await TransactionRepository.delete(id);
    return { success: true };
  }
}

