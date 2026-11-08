import { prisma } from "@/lib/prisma";
import {
  calculateAccountBalance,
  calculateNetCashFlow,
  serializeBigInt,
} from "./financial-calculator";

export class DashboardService {
  static async getSummary(userId: string) {
    const accounts = await prisma.account.findMany({
      where: { userId },
    });

    const totalInitial = accounts.reduce(
      (sum, a) => sum + a.initialBalance,
      BigInt(0)
    );

    const allTxAgg = await prisma.transaction.groupBy({
      by: ["type"],
      where: { userId },
      _sum: { amount: true },
    });

    let allTimeIncome = BigInt(0);
    let allTimeExpense = BigInt(0);

    for (const agg of allTxAgg) {
      if (agg.type === "INCOME") allTimeIncome = agg._sum.amount || BigInt(0);
      if (agg.type === "EXPENSE") allTimeExpense = agg._sum.amount || BigInt(0);
    }

    const totalBalance = calculateAccountBalance(
      totalInitial,
      allTimeIncome,
      allTimeExpense
    );

    const now = new Date();
    const startOfMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1, 0, 0, 0));
    const endOfMonth = new Date(
      Date.UTC(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
    );

    const monthTxAgg = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        transactionDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: { amount: true },
    });

    let monthlyIncome = BigInt(0);
    let monthlyExpense = BigInt(0);

    for (const agg of monthTxAgg) {
      if (agg.type === "INCOME") monthlyIncome = agg._sum.amount || BigInt(0);
      if (agg.type === "EXPENSE") monthlyExpense = agg._sum.amount || BigInt(0);
    }

    const netCashFlow = calculateNetCashFlow(monthlyIncome, monthlyExpense);

    return serializeBigInt({
      totalBalance,
      monthlyIncome,
      monthlyExpense,
      netCashFlow,
    });
  }

  static async getRecentTransactions(userId: string, limit = 5) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        account: true,
        category: true,
      },
      orderBy: { transactionDate: "desc" },
      take: limit,
    });

    return serializeBigInt(transactions);
  }

  static async getExpenseBreakdown(userId: string, month?: number, year?: number) {
    const now = new Date();
    const targetMonth = month || now.getMonth() + 1;
    const targetYear = year || now.getFullYear();

    const startDate = new Date(Date.UTC(targetYear, targetMonth - 1, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(targetYear, targetMonth, 0, 23, 59, 59, 999));

    const aggregations = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        userId,
        type: "EXPENSE",
        transactionDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: "desc",
        },
      },
    });

    const totalExpense = aggregations.reduce(
      (sum, agg) => sum + (agg._sum.amount || BigInt(0)),
      BigInt(0)
    );

    const breakdown = await Promise.all(
      aggregations.map(async (agg) => {
        const category = await prisma.category.findUnique({
          where: { id: agg.categoryId },
        });

        const amount = agg._sum.amount || BigInt(0);
        const percentage =
          totalExpense > BigInt(0)
            ? Math.round(Number((amount * BigInt(1000)) / totalExpense)) / 10
            : 0;

        return {
          categoryId: agg.categoryId,
          name: category?.name || "Kategori",
          color: category?.color || "#888",
          value: amount,
          percentage,
        };
      })
    );

    return serializeBigInt(breakdown);
  }

  static async getMonthlyCashFlow(userId: string, monthsCount = 6) {
    const results = [];
    const now = new Date();

    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;

      const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

      const monthName = d.toLocaleDateString("id-ID", { month: "short" });

      const txAgg = await prisma.transaction.groupBy({
        by: ["type"],
        where: {
          userId,
          transactionDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: { amount: true },
      });

      let income = BigInt(0);
      let expense = BigInt(0);

      for (const agg of txAgg) {
        if (agg.type === "INCOME") income = agg._sum.amount || BigInt(0);
        if (agg.type === "EXPENSE") expense = agg._sum.amount || BigInt(0);
      }

      results.push({
        month: monthName,
        monthName,
        year,
        income,
        expense,
        net: calculateNetCashFlow(income, expense),
        netCashFlow: calculateNetCashFlow(income, expense),
      });
    }

    return serializeBigInt(results);
  }
}
