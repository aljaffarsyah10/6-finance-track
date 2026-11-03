"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { SummaryCard } from "@/components/common/summary-card";
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
  mockDashboardSummary,
  mockMonthlyCashFlowChart,
  mockExpenseBreakdown,
} from "@/features/dashboard/mocks/dashboard.mock";
import { mockTransactions } from "@/features/transactions/mocks/transactions.mock";
import { mockAccounts } from "@/features/accounts/mocks/accounts.mock";
import { mockCategories } from "@/features/categories/mocks/categories.mock";
import { mockBudgets } from "@/features/budgets/mocks/budgets.mock";
import { TransactionDialog } from "@/features/transactions/components/transaction-dialog";
import { TransactionFormValues } from "@/lib/validations/transaction.schema";
import { formatIDR, formatDate } from "@/lib/utils";
import { Transaction } from "@/types";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTransaction = (data: TransactionFormValues) => {
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: "user_demo",
      accountId: data.accountId,
      categoryId: data.categoryId,
      type: data.type,
      amount: data.amount,
      description: data.description || "",
      transactionDate: new Date(data.transactionDate).toISOString(),
      account: mockAccounts.find((a) => a.id === data.accountId),
      category: mockCategories.find((c) => c.id === data.categoryId),
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

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
          value={formatIDR(mockDashboardSummary.totalBalance)}
          description="Dari 4 akun keuangan aktif"
          icon={<Wallet className="h-5 w-5" />}
          variant="default"
        />
        <SummaryCard
          title="Pemasukan Bulan Ini"
          value={formatIDR(mockDashboardSummary.monthlyIncome)}
          trend={{ value: "+18.2%", isPositive: true }}
          description="vs bulan lalu"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="income"
        />
        <SummaryCard
          title="Pengeluaran Bulan Ini"
          value={formatIDR(mockDashboardSummary.monthlyExpense)}
          trend={{ value: "-4.5%", isPositive: true }}
          description="terkendali"
          icon={<TrendingDown className="h-5 w-5" />}
          variant="expense"
        />
        <SummaryCard
          title="Arus Kas Bersih"
          value={formatIDR(mockDashboardSummary.netCashFlow)}
          description="Net Cash Flow periode ini"
          icon={<Scale className="h-5 w-5" />}
          variant="income"
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
              Perbandingan pemasukan vs pengeluaran 6 bulan terakhir
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockMonthlyCashFlowChart}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Distribusi Pengeluaran
            </CardTitle>
            <CardDescription>Berdasarkan kategori bulan ini</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex flex-col justify-between">
            <ResponsiveContainer width="100%" height="75%">
              <PieChart>
                <Pie
                  data={mockExpenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {mockExpenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
              {mockExpenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 truncate">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
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
              <CardDescription>Aktivitas pengeluaran dan pemasukan terakhir</CardDescription>
            </div>
            <Link href="/transactions">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Semua Transaksi <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.slice(0, 5).map((tx) => {
              const isIncome = tx.type === "INCOME";
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
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
                    <div>
                      <p className="text-sm font-semibold text-foreground line-clamp-1">
                        {tx.description || tx.category?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tx.category?.name} • {tx.account?.name} • {formatDate(tx.transactionDate, "dd MMM")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-bold font-mono tabular-nums ${
                      isIncome
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatIDR(tx.amount, { type: tx.type })}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">
                Progres Anggaran Bulan Ini
              </CardTitle>
              <CardDescription>Batas pengeluaran per kategori (Nov 2026)</CardDescription>
            </div>
            <Link href="/budgets">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Kelola Anggaran <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockBudgets.map((b) => {
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
            })}
          </CardContent>
        </Card>
      </div>

      <TransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        accounts={mockAccounts}
        categories={mockCategories}
        onSave={handleAddTransaction}
      />
    </div>
  );
}
