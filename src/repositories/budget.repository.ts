import { prisma } from "@/lib/prisma";

export class BudgetRepository {
  static async findById(id: string, userId: string) {
    return prisma.budget.findFirst({
      where: { id, userId },
      include: { category: true },
    });
  }

  static async findManyByUser(userId: string, month?: number, year?: number) {
    return prisma.budget.findMany({
      where: {
        userId,
        ...(month ? { month } : {}),
        ...(year ? { year } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "asc" },
    });
  }

  static async findUniqueByUserCategoryMonth(
    userId: string,
    categoryId: string,
    month: number,
    year: number
  ) {
    return prisma.budget.findUnique({
      where: {
        userId_categoryId_month_year: {
          userId,
          categoryId,
          month,
          year,
        },
      },
    });
  }

  static async create(data: {
    userId: string;
    categoryId: string;
    amount: bigint;
    month: number;
    year: number;
  }) {
    return prisma.budget.create({
      data,
      include: { category: true },
    });
  }

  static async update(id: string, data: { amount?: bigint }) {
    return prisma.budget.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  static async delete(id: string) {
    return prisma.budget.delete({
      where: { id },
    });
  }
}

