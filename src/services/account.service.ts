import { AccountRepository } from "@/repositories/account.repository";
import { prisma } from "@/lib/prisma";
import { calculateAccountBalance, serializeBigInt } from "./financial-calculator";
import { AccountType } from "@prisma/client";

export class AccountService {
  static async getAccountsWithBalances(userId: string) {
    const accounts = await AccountRepository.findManyByUser(userId);

    const accountsWithBalance = await Promise.all(
      accounts.map(async (acc) => {
        const aggregations = await prisma.transaction.groupBy({
          by: ["type"],
          where: {
            accountId: acc.id,
            userId,
          },
          _sum: {
            amount: true,
          },
        });

        let totalIncome = BigInt(0);
        let totalExpense = BigInt(0);

        for (const agg of aggregations) {
          if (agg.type === "INCOME") {
            totalIncome = agg._sum.amount || BigInt(0);
          } else if (agg.type === "EXPENSE") {
            totalExpense = agg._sum.amount || BigInt(0);
          }
        }

        const currentBalance = calculateAccountBalance(
          acc.initialBalance,
          totalIncome,
          totalExpense
        );

        return {
          ...acc,
          currentBalance,
        };
      })
    );

    return serializeBigInt(accountsWithBalance);
  }

  static async createAccount(
    userId: string,
    data: { name: string; type: AccountType; initialBalance: number }
  ) {
    const account = await AccountRepository.create({
      userId,
      name: data.name,
      type: data.type,
      initialBalance: BigInt(data.initialBalance || 0),
    });

    return serializeBigInt({
      ...account,
      currentBalance: account.initialBalance,
    });
  }

  static async updateAccount(
    id: string,
    userId: string,
    data: { name?: string; type?: AccountType }
  ) {
    const existing = await AccountRepository.findById(id, userId);
    if (!existing) {
      throw new Error("Akun tidak ditemukan atau bukan milik Anda.");
    }

    const updated = await AccountRepository.update(id, userId, data);
    return serializeBigInt(updated);
  }

  static async deleteAccount(id: string, userId: string) {
    const existing = await AccountRepository.findById(id, userId);
    if (!existing) {
      throw new Error("Akun tidak ditemukan atau bukan milik Anda.");
    }

    const txCount = await AccountRepository.countTransactions(id);
    if (txCount > 0) {
      throw new Error(
        `Akun tidak dapat dihapus karena masih memiliki ${txCount} catatan transaksi.`
      );
    }

    await AccountRepository.delete(id);
    return { success: true };
  }
}
