"use client";

import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { SummaryCard } from "@/components/common/summary-card";
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
import { mockAnnualTrendData } from "@/features/reports/mocks/reports.mock";
import { mockExpenseBreakdown } from "@/features/dashboard/mocks/dashboard.mock";
import { formatIDR } from "@/lib/utils";
import { toast } from "sonner";

export default function ReportsPage() {
  const selectedYear = 2026;

  const totalAnnualIncome = mockAnnualTrendData.reduce((sum, d) => sum + d.income, 0);
  const totalAnnualExpense = mockAnnualTrendData.reduce((sum, d) => sum + d.expense, 0);
  const totalAnnualSavings = totalAnnualIncome - totalAnnualExpense;
  const savingsRate =
    totalAnnualIncome > 0
      ? Math.round((totalAnnualSavings / totalAnnualIncome) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan & Analitik Finansial"
        description="Analisis arus kas, distribusi pengeluaran, dan rasio tabungan tahunan Anda."
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Tahun {selectedYear}</span>
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
          description="Tahun 2026 (Jan - Nov)"
          variant="income"
        />
        <SummaryCard
          title="Total Pengeluaran Tahunan"
          value={formatIDR(totalAnnualExpense)}
          description="Tahun 2026 (Jan - Nov)"
          variant="expense"
        />
        <SummaryCard
          title="Akumulasi Tabungan Bersih"
          value={formatIDR(totalAnnualSavings)}
          description="Net Cash Flow tahunan"
          variant="income"
        />
        <SummaryCard
          title="Rasio Tabungan (Savings Rate)"
          value={`${savingsRate}%`}
          description="Kategori Sangat Sehat (Ideal >20%)"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="warning"
        />
      </div>

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
                Visualisasi dinamika pendapatan dan belanja sepanjang tahun berjalan
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockAnnualTrendData}
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
                <CardDescription>Kategori yang paling dominan menguras anggaran</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockExpenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
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
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
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
                {mockExpenseBreakdown.map((item, idx) => {
                  const total = mockExpenseBreakdown.reduce((s, x) => s + x.value, 0);
                  const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
                  return (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-semibold text-foreground">
                            {idx + 1}. {item.name}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-foreground">
                          {formatIDR(item.value)} ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
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
                Pertumbuhan surplus arus kas dari bulan ke bulan
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockAnnualTrendData}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
