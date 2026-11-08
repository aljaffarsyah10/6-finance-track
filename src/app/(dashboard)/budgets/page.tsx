"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { ErrorState } from "@/components/common/error-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Target, Calendar, Edit2, Trash2 } from "lucide-react";
import { budgetsApi, categoriesApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import { BudgetDialog } from "@/features/budgets/components/budget-dialog";
import { BudgetFormValues } from "@/lib/validations/budget.schema";
import { formatIDR } from "@/lib/utils";
import { Budget, Category } from "@/types";
import { toast } from "sonner";

export default function BudgetsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedMonth, setSelectedMonth] = useState(11);
  const [selectedYear, setSelectedYear] = useState(2026);

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);
  const [budgetToDelete, setBudgetToDelete] = useState<Budget | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load categories
  useEffect(() => {
    let ignore = false;
    async function loadCategories() {
      try {
        const cats = await categoriesApi.fetchCategories("EXPENSE");
        if (!ignore) {
          setCategories(cats);
        }
      } catch (err) {
        console.error("Gagal memuat kategori pengeluaran:", err);
      }
    }
    loadCategories();
    return () => {
      ignore = true;
    };
  }, []);

  // Fetch budgets
  useEffect(() => {
    let ignore = false;

    async function loadBudgets() {
      try {
        const data = await budgetsApi.fetchBudgets(selectedMonth, selectedYear);
        if (!ignore) {
          setBudgets(data);
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

    loadBudgets();

    return () => {
      ignore = true;
    };
  }, [selectedMonth, selectedYear, refreshTrigger]);

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage =
    totalBudget > 0 ? Math.min(Math.round((totalSpent / totalBudget) * 100), 100) : 0;

  const handleSaveBudget = async (data: BudgetFormValues, id?: string) => {
    try {
      if (id) {
        await budgetsApi.updateBudget(id, data);
        toast.success("Anggaran berhasil diperbarui.");
      } else {
        await budgetsApi.createBudget(data);
        toast.success("Anggaran baru berhasil ditetapkan.");
      }
      setIsDialogOpen(false);
      setBudgetToEdit(null);
      setLoading(true);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!budgetToDelete) return;
    setIsDeleting(true);
    try {
      await budgetsApi.deleteBudget(budgetToDelete.id);
      toast.success("Anggaran berhasil dihapus.");
      setBudgetToDelete(null);
      setLoading(true);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  };

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Anggaran Bulanan"
        description="Batasi dan kendalikan pos pengeluaran bulanan berdasarkan kategori."
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
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Plafon Terpakai ({monthNames[selectedMonth - 1]} {selectedYear})
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono tracking-tight text-foreground">
                  {formatIDR(totalSpent)}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  / {formatIDR(totalBudget)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Sisa Anggaran</p>
                <p
                  className={`text-lg font-bold font-mono ${
                    totalRemaining < 0
                      ? "text-[#FF6B5B]"
                      : "text-[#0D9488] dark:text-[#2DD4BF]"
                  }`}
                >
                  {formatIDR(totalRemaining)}
                </p>
              </div>
              <div className="h-10 w-px bg-border/80" />
              <div>
                <p className="text-xs text-muted-foreground">Persentase</p>
                <p className="text-lg font-bold font-mono text-foreground">
                  {overallPercentage}%
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 h-3 w-full bg-[#F4EDE4] dark:bg-[#1E2D4A] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all rounded-full ${
                overallPercentage >= 100
                  ? "bg-[#FF6B5B]"
                  : overallPercentage >= 80
                  ? "bg-[#D97706]"
                  : "bg-[#0D9488]"
              }`}
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Budget List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LoadingSkeleton variant="card" className="h-48" />
          <LoadingSkeleton variant="card" className="h-48" />
        </div>
      ) : error ? (
        <ErrorState
          title="Gagal Memuat Anggaran"
          description={error}
          onRetry={handleRetry}
        />
      ) : budgets.length === 0 ? (
        <EmptyState
          icon={<Target className="h-10 w-10 text-muted-foreground" />}
          title="Belum Ada Anggaran yang Disetel"
          description={`Anda belum menetapkan batasan pengeluaran kategori untuk ${monthNames[selectedMonth - 1]} ${selectedYear}.`}
          actionLabel="Atur Anggaran Pertama"
          onAction={() => {
            setBudgetToEdit(null);
            setIsDialogOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((b) => {
            const isOver = (b.percentage || 0) >= 100;
            const isWarning = (b.percentage || 0) >= 80 && !isOver;
            const barColor = isOver
              ? "bg-[#FF6B5B]"
              : isWarning
              ? "bg-[#D97706]"
              : "bg-[#0D9488]";

            return (
              <Card key={b.id} className="premium-card relative overflow-hidden rounded-2xl border border-border/80 hover:border-[#FF6B5B]/40 transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                      style={{
                        backgroundColor: `${b.category?.color || "#10b981"}20`,
                        color: b.category?.color || "#10b981",
                      }}
                    >
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base font-bold text-foreground">
                          {b.category?.name}
                        </CardTitle>
                        {isOver ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B5B]/15 text-[#FF6B5B]">
                            Melebihi Batas
                          </span>
                        ) : isWarning ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D97706]/15 text-[#D97706] dark:text-[#FBBF24]">
                            Waspada &gt;=80%
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D9488]/15 text-[#0D9488] dark:text-[#2DD4BF]">
                            Terkendali
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-xs font-medium">
                        Batas Plafon: {formatIDR(b.amount)}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer rounded-lg"
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
                      className="h-8 w-8 text-muted-foreground hover:text-[#FF6B5B] cursor-pointer rounded-lg"
                      onClick={() => setBudgetToDelete(b)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Hapus</span>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">
                      Terpakai:{" "}
                      <span className="font-mono text-foreground">
                        {formatIDR(b.spent || 0)}
                      </span>
                    </span>
                    <span
                      className={`font-mono ${
                        isOver
                          ? "text-red-600 font-bold"
                          : isWarning
                          ? "text-amber-600 font-bold"
                          : "text-muted-foreground"
                      }`}
                    >
                      Sisa: {formatIDR(b.remaining || 0)} ({b.percentage}%)
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} transition-all rounded-full`}
                      style={{ width: `${Math.min(b.percentage || 0, 100)}%` }}
                    />
                  </div>

                  {isOver && (
                    <p className="text-[11px] font-medium text-red-600 dark:text-red-400">
                      ⚠️ Pengeluaran telah melebihi batas anggaran yang ditentukan!
                    </p>
                  )}
                  {isWarning && (
                    <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                      ⚡ Waspada! Pengeluaran telah mencapai 80% dari batas anggaran.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialog Form Anggaran */}
      <BudgetDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setBudgetToEdit(null);
        }}
        categories={categories}
        budgetToEdit={budgetToEdit}
        currentMonth={selectedMonth}
        currentYear={selectedYear}
        onSave={handleSaveBudget}
      />

      {/* Dialog Konfirmasi Hapus */}
      <ConfirmDialog
        open={Boolean(budgetToDelete)}
        onOpenChange={(open) => {
          if (!open) setBudgetToDelete(null);
        }}
        title="Hapus Anggaran"
        description={`Apakah Anda yakin ingin menghapus anggaran untuk kategori "${budgetToDelete?.category?.name}"?`}
        confirmLabel={isDeleting ? "Menghapus..." : "Ya, Hapus"}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
