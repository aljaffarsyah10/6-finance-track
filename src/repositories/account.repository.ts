import { prisma } from "@/lib/prisma";
import { AccountType } from "@prisma/client";

export class AccountRepository {
  static async findById(id: string, userId: string) {
    return prisma.account.findFirst({
      where: { id, userId },
    });
  }

  static async findManyByUser(userId: string) {
    return prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  }

  static async create(data: {
    userId: string;
    name: string;
    type: AccountType;
    initialBalance: bigint;
  }) {
    return prisma.account.create({
      data,
    });
  }

  static async update(
    id: string,
    userId: string,
    data: { name?: string; type?: AccountType }
  ) {
    return prisma.account.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.account.delete({
      where: { id },
    });
  }

  static async countTransactions(accountId: string) {
    return prisma.transaction.count({
      where: { accountId },
    });
  }
}
