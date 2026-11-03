"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/page-header";
import { SummaryCard } from "@/components/common/summary-card";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { reportsApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import { formatIDR } from "@/lib/utils";
import {
  CashFlowReportItem,
  ExpenseByCategoryReportItem,
} from "@/types";
import { toast } from "sonner";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(11);

  const [cashFlowData, setCashFlowData] = useState<CashFlowReportItem[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseByCategoryReportItem[]>([]);

  useEffect(() => {
    let ignore = false;

    async function loadReports() {
      try {
        const [cashFlowRes, expenseRes] = await Promise.all([
          reportsApi.fetchCashFlowReport(selectedYear),
          reportsApi.fetchExpenseReport(selectedMonth, selectedYear),
        ]);
        if (!ignore) {
          setCashFlowData(cashFlowRes);
          setExpenseData(expenseRes);
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

    loadReports();

    return () => {
      ignore = true;
    };
  }, [selectedMonth, selectedYear, refreshTrigger]);

  const totalAnnualIncome = cashFlowData.reduce((sum, d) => sum + d.income, 0);
  const totalAnnualExpense = cashFlowData.reduce((sum, d) => sum + d.expense, 0);
  const totalAnnualSavings = totalAnnualIncome - totalAnnualExpense;
  const savingsRate =
    totalAnnualIncome > 0
      ? Math.max(0, Math.round((totalAnnualSavings / totalAnnualIncome) * 100))
      : 0;

  const chartCashflow = cashFlowData.map((d) => ({
    month: d.monthName.slice(0, 3),
    income: d.income,
    expense: d.expense,
    savings: d.netCashFlow,
  }));

  const pieColors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b"];

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const handleRetry = () => {
    setLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan & Analitik Finansial"
        description="Analisis arus kas, distribusi pengeluaran, dan rasio tabungan tahunan Anda."
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={selectedMonth}
              onChange={(e) => {
                setLoading(true);
                setSelectedMonth(Number(e.target.value));
              }}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              {monthNames.map((name, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {name}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => {
                setLoading(true);
                setSelectedYear(Number(e.target.value));
              }}
              className="bg-transparent focus:outline-none cursor-pointer ml-1"
            >
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => toast.info("Fitur ekspor PDF & CSV akan aktif di Phase 8")}
          >
            <Download className="h-4 w-4" />
            Ekspor Laporan
          </Button>
        </div>
      </PageHeader>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Pemasukan Tahunan"
          value={formatIDR(totalAnnualIncome)}
          description={`Tahun ${selectedYear}`}
          variant="income"
        />
        <SummaryCard
          title="Total Pengeluaran Tahunan"
          value={formatIDR(totalAnnualExpense)}
          description={`Tahun ${selectedYear}`}
          variant="expense"
        />
        <SummaryCard
          title="Akumulasi Tabungan Bersih"
          value={formatIDR(totalAnnualSavings)}
          description="Net Cash Flow tahunan"
          variant={totalAnnualSavings >= 0 ? "income" : "expense"}
        />
        <SummaryCard
          title="Rasio Tabungan (Savings Rate)"
          value={`${savingsRate}%`}
          description={
            savingsRate >= 20
              ? "Kategori Sehat (Target >20%)"
              : "Perlu Ditingkatkan (<20%)"
          }
          icon={<TrendingUp className="h-5 w-5" />}
          variant={savingsRate >= 20 ? "default" : "warning"}
        />
      </div>

      {loading ? (
        <Card className="p-6">
          <LoadingSkeleton variant="card" className="h-80" />
        </Card>
      ) : error ? (
        <ErrorState
          title="Gagal Memuat Laporan Finansial"
          description={error}
          onRetry={handleRetry}
        />
      ) : (
        <Tabs defaultValue="cashflow" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="cashflow" className="gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4" />
              Arus Kas
            </TabsTrigger>
            <TabsTrigger value="expenses" className="gap-2 text-xs sm:text-sm">
              <PieIcon className="h-4 w-4" />
              Distribusi
            </TabsTrigger>
            <TabsTrigger value="savings" className="gap-2 text-xs sm:text-sm">
              <TrendingUp className="h-4 w-4" />
              Pertumbuhan
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Cashflow */}
          <TabsContent value="cashflow" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Tren Arus Kas Bulanan (Pemasukan vs Pengeluaran)
                </CardTitle>
                <CardDescription>
                  Visualisasi perbandingan pendapatan dan belanja sepanjang tahun {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {chartCashflow.every((d) => d.income === 0 && d.expense === 0) ? (
                  <div className="h-full flex items-center justify-center">
                    <EmptyState
                      title="Belum Ada Data Transaksi"
                      description={`Belum ada data arus kas tercatat pada tahun ${selectedYear}.`}
                    />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartCashflow}
                      margin={{ top: 15, right: 10, left: 0, bottom: 0 }}
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
                      <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                      <Bar dataKey="income" name="Pemasukan" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" name="Pengeluaran" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Expenses by category */}
          <TabsContent value="expenses" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    Proporsi Pengeluaran per Kategori
                  </CardTitle>
                  <CardDescription>
                    Kategori dominan pada {monthNames[selectedMonth - 1]} {selectedYear}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {expenseData.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">
                        Belum ada pos pengeluaran tercatat pada periode ini.
                      </p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={95}
                          paddingAngle={4}
                          dataKey="amount"
                          nameKey="categoryName"
                        >
                          {expenseData.map((entry, index) => (
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
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    Rincian Nominal Kategori
                  </CardTitle>
                  <CardDescription>Peringkat pos pengeluaran tertinggi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {expenseData.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-8 text-center">
                      Tidak ada pos pengeluaran untuk ditampilkan.
                    </p>
                  ) : (
                    expenseData.map((item, idx) => {
                      const color = item.color || pieColors[idx % pieColors.length];
                      return (
                        <div key={item.categoryId} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-medium">
                            <div className="flex items-center gap-2 truncate">
                              <span
                                className="h-2.5 w-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: color }}
                              />
                              <span className="font-semibold text-foreground truncate">
                                {idx + 1}. {item.categoryName}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-foreground shrink-0 ml-2">
                              {formatIDR(item.amount)} ({item.percentage}%)
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 3: Savings growth */}
          <TabsContent value="savings" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Tren Akumulasi Tabungan Bersih
                </CardTitle>
                <CardDescription>
                  Pertumbuhan surplus atau defisit kas bersih bulanan sepanjang tahun {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {chartCashflow.every((d) => d.savings === 0) ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">
                      Belum ada data tabungan bersih untuk ditampilkan.
                    </p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartCashflow}
                      margin={{ top: 15, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="savingsColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
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
                      <Area
                        type="monotone"
                        dataKey="savings"
                        name="Tabungan Bersih"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#savingsColor)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
