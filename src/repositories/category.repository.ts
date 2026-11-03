import { prisma } from "@/lib/prisma";
import { TransactionType } from "@prisma/client";

export class CategoryRepository {
  static async findById(id: string, userId: string) {
    return prisma.category.findFirst({
      where: { id, userId },
    });
  }

  static async findManyByUser(userId: string, type?: TransactionType) {
    return prisma.category.findMany({
      where: {
        userId,
        ...(type ? { type } : {}),
      },
      orderBy: { name: "asc" },
    });
  }

  static async create(data: {
    userId: string;
    name: string;
    type: TransactionType;
    icon?: string;
    color?: string;
  }) {
    return prisma.category.create({
      data,
    });
  }

  static async update(
    id: string,
    userId: string,
    data: { name?: string; icon?: string; color?: string }
  ) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }

  static async countUsage(categoryId: string) {
    const [txCount, bgtCount] = await Promise.all([
      prisma.transaction.count({ where: { categoryId } }),
      prisma.budget.count({ where: { categoryId } }),
    ]);
    return { txCount, bgtCount };
  }
}
