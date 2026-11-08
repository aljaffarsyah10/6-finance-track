import { prisma } from "@/lib/prisma";
import { calculateNetCashFlow, serializeBigInt } from "./financial-calculator";

export class ReportService {
  static async getCashFlowReport(userId: string, year: number) {
    const monthlyData = [];

    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

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

      const netCashFlow = calculateNetCashFlow(income, expense);
      const monthName = monthNames[month - 1];

      monthlyData.push({
        month,
        monthName,
        income,
        expense,
        netCashFlow,
        savings: netCashFlow,
      });
    }

    return serializeBigInt(monthlyData);
  }

  static async getExpenseCategoryReport(userId: string, startDate?: string, endDate?: string) {
    const whereDate = {
      ...(startDate ? { gte: new Date(startDate) } : {}),
      ...(endDate ? { lte: new Date(endDate) } : {}),
    };

    const aggregations = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        userId,
        type: "EXPENSE",
        ...(startDate || endDate ? { transactionDate: whereDate } : {}),
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

    const categoriesReport = await Promise.all(
      aggregations.map(async (agg) => {
        const cat = await prisma.category.findUnique({
          where: { id: agg.categoryId },
        });

        const amount = agg._sum.amount || BigInt(0);
        const percentage =
          totalExpense > BigInt(0)
            ? Math.round(Number((amount * BigInt(1000)) / totalExpense)) / 10
            : 0;

        return {
          categoryId: agg.categoryId,
          categoryName: cat?.name || "Kategori",
          color: cat?.color || "#888",
          totalAmount: amount,
          percentage,
        };
      })
    );

    return serializeBigInt({
      totalExpense,
      categories: categoriesReport,
    });
  }

  static async getIncomeExpenseComparison(
    userId: string,
    startDate?: string,
    endDate?: string
  ) {
    const whereDate = {
      ...(startDate ? { gte: new Date(startDate) } : {}),
      ...(endDate ? { lte: new Date(endDate) } : {}),
    };

    const txAgg = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        ...(startDate || endDate ? { transactionDate: whereDate } : {}),
      },
      _sum: { amount: true },
    });

    let totalIncome = BigInt(0);
    let totalExpense = BigInt(0);

    for (const agg of txAgg) {
      if (agg.type === "INCOME") totalIncome = agg._sum.amount || BigInt(0);
      if (agg.type === "EXPENSE") totalExpense = agg._sum.amount || BigInt(0);
    }

    const netCashFlow = calculateNetCashFlow(totalIncome, totalExpense);
    const savingsRate =
      totalIncome > BigInt(0)
        ? Math.round(Number((netCashFlow * BigInt(1000)) / totalIncome)) / 10
        : 0;

    return serializeBigInt({
      totalIncome,
      totalExpense,
      netCashFlow,
      savingsRate,
    });
  }
}
