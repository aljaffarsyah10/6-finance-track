import { prisma } from "@/lib/prisma";
import { TransactionType, Prisma } from "@prisma/client";

export interface TransactionFilterOptions {
  startDate?: string;
  endDate?: string;
  accountId?: string;
  categoryId?: string;
  type?: TransactionType;
  search?: string;
  skip?: number;
  take?: number;
}

export class TransactionRepository {
  static async findById(id: string, userId: string) {
    return prisma.transaction.findFirst({
      where: { id, userId },
      include: {
        account: true,
        category: true,
      },
    });
  }

  static async findManyByUser(userId: string, options: TransactionFilterOptions = {}) {
    const where: Prisma.TransactionWhereInput = {
      userId,
      ...(options.accountId ? { accountId: options.accountId } : {}),
      ...(options.categoryId ? { categoryId: options.categoryId } : {}),
      ...(options.type ? { type: options.type } : {}),
      ...(options.startDate || options.endDate
        ? {
            transactionDate: {
              ...(options.startDate ? { gte: new Date(options.startDate) } : {}),
              ...(options.endDate ? { lte: new Date(options.endDate) } : {}),
            },
          }
        : {}),
      ...(options.search
        ? {
            description: {
              contains: options.search,
              mode: "insensitive" as Prisma.QueryMode,
            },
          }
        : {}),
    };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          account: true,
          category: true,
        },
        orderBy: { transactionDate: "desc" },
        skip: options.skip,
        take: options.take,
      }),
      prisma.transaction.count({ where }),
    ]);

    return { transactions, total };
  }

  static async create(data: {
    userId: string;
    accountId: string;
    categoryId: string;
    type: TransactionType;
    amount: bigint;
    transactionDate: Date;
    description?: string;
  }) {
    return prisma.transaction.create({
      data,
      include: {
        account: true,
        category: true,
      },
    });
  }

  static async update(
    id: string,
    data: {
      accountId?: string;
      categoryId?: string;
      type?: TransactionType;
      amount?: bigint;
      transactionDate?: Date;
      description?: string;
    }
  ) {
    return prisma.transaction.update({
      where: { id },
      data,
      include: {
        account: true,
        category: true,
      },
    });
  }

  static async delete(id: string) {
    return prisma.transaction.delete({
      where: { id },
    });
  }
}

