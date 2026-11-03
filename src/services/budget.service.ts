import { BudgetRepository } from "@/repositories/budget.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import { prisma } from "@/lib/prisma";
import { calculateBudgetUsage, serializeBigInt } from "./financial-calculator";

export class BudgetService {
  static async getBudgetsWithProgress(userId: string, month: number, year: number) {
    const budgets = await BudgetRepository.findManyByUser(userId, month, year);

    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    const enrichedBudgets = await Promise.all(
      budgets.map(async (b) => {
        const expenseAgg = await prisma.transaction.aggregate({
          where: {
            userId,
            categoryId: b.categoryId,
            type: "EXPENSE",
            transactionDate: {
              gte: startDate,
              lte: endDate,
            },
          },
          _sum: {
            amount: true,
          },
        });

        const spent = expenseAgg._sum.amount || BigInt(0);
        const usage = calculateBudgetUsage(spent, b.amount);

        return {
          ...b,
          spent,
          remaining: usage.remaining,
          percentage: usage.percentage,
          isOver: usage.isOver,
          isWarning: usage.isWarning,
        };
      })
    );

    return serializeBigInt(enrichedBudgets);
  }

  static async createBudget(
    userId: string,
    data: { categoryId: string; amount: number; month: number; year: number }
  ) {
    const category = await CategoryRepository.findById(data.categoryId, userId);
    if (!category) {
      throw new Error("Kategori tidak ditemukan atau bukan milik Anda.");
    }

    if (category.type !== "EXPENSE") {
      throw new Error("Anggaran hanya dapat ditetapkan untuk kategori tipe Pengeluaran.");
    }

    const existing = await BudgetRepository.findUniqueByUserCategoryMonth(
      userId,
      data.categoryId,
      data.month,
      data.year
    );

    if (existing) {
      throw new Error(
        `Anggaran untuk kategori "${category.name}" pada periode ${data.month}/${data.year} sudah ada.`
      );
    }

    const budget = await BudgetRepository.create({
      userId,
      categoryId: data.categoryId,
      amount: BigInt(data.amount),
      month: data.month,
      year: data.year,
    });

    return serializeBigInt({
      ...budget,
      spent: 0,
      remaining: budget.amount,
      percentage: 0,
    });
  }

  static async updateBudget(id: string, userId: string, data: { amount: number }) {
    const existing = await BudgetRepository.findById(id, userId);
    if (!existing) {
      throw new Error("Anggaran tidak ditemukan atau bukan milik Anda.");
    }

    const updated = await BudgetRepository.update(id, {
      amount: BigInt(data.amount),
    });

    return serializeBigInt(updated);
  }

  static async deleteBudget(id: string, userId: string) {
    const existing = await BudgetRepository.findById(id, userId);
    if (!existing) {
      throw new Error("Anggaran tidak ditemukan atau bukan milik Anda.");
    }

    await BudgetRepository.delete(id);
    return { success: true };
  }
}
