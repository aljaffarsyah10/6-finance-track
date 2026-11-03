"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Target, Calendar, Edit2, Trash2 } from "lucide-react";
import { mockBudgets } from "@/features/budgets/mocks/budgets.mock";
import { mockCategories } from "@/features/categories/mocks/categories.mock";
import { BudgetDialog } from "@/features/budgets/components/budget-dialog";
import { BudgetFormValues } from "@/lib/validations/budget.schema";
import { formatIDR } from "@/lib/utils";
import { Budget } from "@/types";
import { toast } from "sonner";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const selectedMonth = 11;
  const selectedYear = 2026;

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);
  const [budgetToDelete, setBudgetToDelete] = useState<Budget | null>(null);

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage =
    totalBudget > 0 ? Math.min(Math.round((totalSpent / totalBudget) * 100), 100) : 0;

  const handleSaveBudget = (data: BudgetFormValues, id?: string) => {
    if (id) {
      setBudgets((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                amount: data.amount,
                remaining: data.amount - (b.spent || 0),
                percentage:
                  data.amount > 0 ? Math.round(((b.spent || 0) / data.amount) * 100) : 0,
              }
            : b
        )
      );
    } else {
      const cat = mockCategories.find((c) => c.id === data.categoryId);
      const newBudget: Budget = {
        id: `bgt_${Date.now()}`,
        userId: "user_demo",
        categoryId: data.categoryId,
        amount: data.amount,
        spent: 0,
        remaining: data.amount,
        percentage: 0,
        month: data.month,
        year: data.year,
        category: cat,
        createdAt: new Date().toISOString(),
      };
      setBudgets((prev) => [...prev, newBudget]);
    }
  };

  const handleDelete = () => {
    if (!budgetToDelete) return;
    setBudgets((prev) => prev.filter((b) => b.id !== budgetToDelete.id));
    toast.success("Anggaran berhasil dihapus");
    setBudgetToDelete(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Anggaran Bulanan"
        description="Batasi dan kendalikan pos pengeluaran bulanan berdasarkan kategori."
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>November 2026</span>
          </div>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => {
              setBudgetToEdit(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Atur Anggaran
          </Button>
        </div>
      </PageHeader>

      {/* Budget Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Ringkasan Anggaran Periode Ini
          </CardTitle>
          <CardDescription>
            Total alokasi batas pengeluaran vs realisasi berjalan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground">Total Plafon Anggaran</p>
              <p className="text-xl font-bold font-mono text-foreground mt-0.5">
                {formatIDR(totalBudget)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Realisasi Terpakai</p>
              <p className="text-xl font-bold font-mono text-red-600 dark:text-red-400 mt-0.5">
                {formatIDR(totalSpent)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sisa Anggaran Tersedia</p>
              <p
                className={`text-xl font-bold font-mono mt-0.5 ${
                  totalRemaining >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {formatIDR(totalRemaining)}
              </p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-muted-foreground">Persentase Pengeluaran Global</span>
              <span className="font-bold text-foreground">{overallPercentage}%</span>
            </div>
            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  overallPercentage >= 100
                    ? "bg-red-500"
                    : overallPercentage >= 80
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Budget Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((b) => {
          const isOver = (b.percentage || 0) >= 100;
          const isWarning = (b.percentage || 0) >= 80 && !isOver;
          const barColor = isOver
            ? "bg-red-500"
            : isWarning
            ? "bg-amber-500"
            : "bg-emerald-500";

          return (
            <Card key={b.id} className="p-4 space-y-3 group hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${b.category?.color || "#10b981"}20`,
                      color: b.category?.color || "#10b981",
                    }}
                  >
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {b.category?.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      Plafon: {formatIDR(b.amount)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setBudgetToEdit(b);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-red-600"
                    onClick={() => setBudgetToDelete(b)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Hapus</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Terpakai:{" "}
                    <strong className="text-foreground font-mono">
                      {formatIDR(b.spent || 0)}
                    </strong>
                  </span>
                  <span
                    className={`font-bold ${
                      isOver
                        ? "text-red-600"
                        : isWarning
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {b.percentage}%
                  </span>
                </div>

                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all`}
                    style={{ width: `${Math.min(b.percentage || 0, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span>
                    Sisa:{" "}
                    <strong
                      className={`font-mono ${
                        (b.remaining || 0) < 0 ? "text-red-600" : "text-foreground"
                      }`}
                    >
                      {formatIDR(b.remaining || 0)}
                    </strong>
                  </span>
                  <span>
                    {isOver
                      ? "Melebihi anggaran"
                      : isWarning
                      ? "Mendekati limit"
                      : "Dalam batas aman"}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <BudgetDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        categories={mockCategories}
        budgetToEdit={budgetToEdit}
        currentMonth={selectedMonth}
        currentYear={selectedYear}
        onSave={handleSaveBudget}
      />

      <ConfirmDialog
        open={Boolean(budgetToDelete)}
        onOpenChange={(open) => !open && setBudgetToDelete(null)}
        title="Hapus Anggaran"
        description={`Apakah Anda yakin ingin menghapus anggaran untuk kategori "${budgetToDelete?.category?.name}"?`}
        confirmLabel="Hapus Anggaran"
        onConfirm={handleDelete}
      />
    </div>
  );
}
