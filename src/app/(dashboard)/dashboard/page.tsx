"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { SummaryCard } from "@/components/common/summary-card";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Scale,
  Plus,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  dashboardApi,
  reportsApi,
  budgetsApi,
  accountsApi,
  categoriesApi,
  transactionsApi,
} from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import { TransactionDialog } from "@/features/transactions/components/transaction-dialog";
import { TransactionFormValues } from "@/lib/validations/transaction.schema";
import { formatIDR, formatDate } from "@/lib/utils";
import {
  Transaction,
  Account,
  Category,
  Budget,
  DashboardSummary,
  CashFlowReportItem,
  ExpenseByCategoryReportItem,
} from "@/types";
import { toast } from "sonner";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [summary, setSummary] = useState<DashboardSummary>({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    netCashFlow: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState<ExpenseByCategoryReportItem[]>([]);
  const [cashFlowTrend, setCashFlowTrend] = useState<CashFlowReportItem[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadDashboardData() {
      try {
        const [
          summaryRes,
          recentTxRes,
          expenseRes,
          cashFlowRes,
          budgetsRes,
          accountsRes,
          categoriesRes,
        ] = await Promise.all([
          dashboardApi.fetchDashboardSummary(),
          dashboardApi.fetchRecentTransactions(5),
          dashboardApi.fetchExpenseBreakdown(),
          reportsApi.fetchCashFlowReport(),
          budgetsApi.fetchBudgets(),
          accountsApi.fetchAccounts(),
          categoriesApi.fetchCategories(),
        ]);

        if (!ignore) {
          setSummary(summaryRes);
          setRecentTransactions(recentTxRes);
          setExpenseBreakdown(expenseRes);
          setCashFlowTrend(cashFlowRes);
          setBudgets(budgetsRes);
          setAccounts(accountsRes);
          setCategories(categoriesRes);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      ignore = true;
    };
  }, [refreshTrigger]);

  const handleCreateTransaction = async (data: TransactionFormValues) => {
    try {
      await transactionsApi.createTransaction(data);
      toast.success("Transaksi baru berhasil dicatat.");
      setLoading(true);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg);
      throw err;
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <LoadingSkeleton variant="text" className="w-48 h-8" />
          <LoadingSkeleton variant="button" className="w-36 h-9" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <LoadingSkeleton variant="card" className="h-28" />
          <LoadingSkeleton variant="card" className="h-28" />
          <LoadingSkeleton variant="card" className="h-28" />
          <LoadingSkeleton variant="card" className="h-28" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LoadingSkeleton variant="card" className="lg:col-span-2 h-80" />
          <LoadingSkeleton variant="card" className="h-80" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Gagal Memuat Dashboard"
        description={error}
        onRetry={handleRetry}
      />
    );
  }

  const chartData = cashFlowTrend.slice(-6).map((item) => ({
    month: item.monthName.slice(0, 3),
    income: item.income,
    expense: item.expense,
  }));

  const pieColors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b"];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ringkasan Finansial"
        description="Pantau kondisi saldo rekening, pemasukan, pengeluaran, dan progres anggaran Anda."
      >
        <Button size="sm" className="gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Catat Transaksi
        </Button>
      </PageHeader>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Saldo"
          value={formatIDR(summary.totalBalance)}
          description={`Dari ${accounts.length} akun keuangan aktif`}
          icon={<Wallet className="h-5 w-5" />}
          variant="default"
        />
        <SummaryCard
          title="Pemasukan Bulan Ini"
          value={formatIDR(summary.monthlyIncome)}
          description="Total arus kas masuk"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="income"
        />
        <SummaryCard
          title="Pengeluaran Bulan Ini"
          value={formatIDR(summary.monthlyExpense)}
          description="Total arus kas keluar"
          icon={<TrendingDown className="h-5 w-5" />}
          variant="expense"
        />
        <SummaryCard
          title="Arus Kas Bersih"
          value={formatIDR(summary.netCashFlow)}
          description={summary.netCashFlow >= 0 ? "Surplus periode ini" : "Defisit periode ini"}
          icon={<Scale className="h-5 w-5" />}
          variant={summary.netCashFlow >= 0 ? "income" : "expense"}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Tren Arus Kas Bulanan
            </CardTitle>
            <CardDescription>
              Perbandingan pemasukan vs pengeluaran tahun berjalan
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {chartData.length === 0 || chartData.every((d) => d.income === 0 && d.expense === 0) ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <EmptyState
                  title="Belum Ada Aktivitas Transaksi"
                  description="Catat transaksi pertama Anda untuk melihat grafik tren pemasukan dan pengeluaran."
                />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                  <YAxis
                    stroke="#888888"
                    fontSize={11}
                    tickFormatter={(val) => `${(val / 1000000).toFixed(0)} jt`}
                  />
                  <Tooltip
                    formatter={(val) => formatIDR(Number(val) || 0)}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                  <Bar dataKey="income" name="Pemasukan" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Pengeluaran" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Distribusi Pengeluaran
            </CardTitle>
            <CardDescription>Berdasarkan kategori pengeluaran bulan ini</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex flex-col justify-between">
            {expenseBreakdown.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <PieChartIcon className="h-10 w-10 text-muted-foreground/40 mb-2" />
                <p className="text-xs text-muted-foreground">Belum ada pengeluaran bulan ini.</p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="75%">
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="amount"
                      nameKey="categoryName"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${entry.categoryId}`}
                          fill={entry.color || pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val) => formatIDR(Number(val) || 0)}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "0.5rem",
                        fontSize: "0.75rem",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-border">
                  {expenseBreakdown.slice(0, 6).map((item, index) => (
                    <div key={item.categoryId} className="flex items-center gap-1.5 truncate">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            item.color || pieColors[index % pieColors.length],
                        }}
                      />
                      <span className="truncate text-muted-foreground">
                        {item.categoryName} ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions & Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">
                Transaksi Terkini
              </CardTitle>
              <CardDescription>Aktivitas arus kas terakhir yang tercatat</CardDescription>
            </div>
            <Link href="/transactions">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Semua Transaksi <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                Belum ada transaksi tercatat. Mulai dengan mencatat transaksi baru.
              </div>
            ) : (
              recentTransactions.map((tx) => {
                const isIncome = tx.type === "INCOME";
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          isIncome
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                        }`}
                      >
                        {isIncome ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {tx.description || tx.category?.name || "Transaksi"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {tx.category?.name} • {tx.account?.name} • {formatDate(tx.transactionDate, "dd MMM")}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-bold font-mono tabular-nums shrink-0 ml-3 ${
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatIDR(tx.amount, { type: tx.type })}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">
                Progres Anggaran Bulan Ini
              </CardTitle>
              <CardDescription>Batas pengeluaran per kategori yang aktif</CardDescription>
            </div>
            <Link href="/budgets">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Kelola Anggaran <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgets.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                Belum ada anggaran yang disetel untuk bulan ini.
              </div>
            ) : (
              budgets.slice(0, 5).map((b) => {
                const isOver = (b.percentage || 0) >= 100;
                const isWarning = (b.percentage || 0) >= 80 && !isOver;
                const barColor = isOver
                  ? "bg-red-500"
                  : isWarning
                  ? "bg-amber-500"
                  : "bg-emerald-500";

                return (
                  <div key={b.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="font-semibold text-foreground">
                        {b.category?.name}
                      </span>
                      <span className="text-muted-foreground">
                        {formatIDR(b.spent || 0)} / {formatIDR(b.amount)}
                        <span
                          className={`ml-1.5 font-bold ${
                            isOver
                              ? "text-red-600"
                              : isWarning
                              ? "text-amber-600"
                              : "text-emerald-600"
                          }`}
                        >
                          ({b.percentage}%)
                        </span>
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} transition-all rounded-full`}
                        style={{ width: `${Math.min(b.percentage || 0, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      <TransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        accounts={accounts}
        categories={categories}
        onSave={handleCreateTransaction}
      />
    </div>
  );
}
