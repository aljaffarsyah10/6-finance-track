"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  budgetSchema,
  BudgetFormValues,
} from "@/lib/validations/budget.schema";
import { Budget, Category } from "@/types";

interface BudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  budgetToEdit?: Budget | null;
  currentMonth?: number;
  currentYear?: number;
  onSave: (data: BudgetFormValues, id?: string) => Promise<void> | void;
}

export function BudgetDialog({
  open,
  onOpenChange,
  categories,
  budgetToEdit,
  currentMonth = 11,
  currentYear = 2026,
  onSave,
}: BudgetDialogProps) {
  const isEditing = Boolean(budgetToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: "",
      amount: undefined,
      month: currentMonth,
      year: currentYear,
    },
  });

  const expenseCategories = categories.filter((c) => c.type === "EXPENSE");

  useEffect(() => {
    if (budgetToEdit) {
      reset({
        categoryId: budgetToEdit.categoryId,
        amount: budgetToEdit.amount,
        month: budgetToEdit.month,
        year: budgetToEdit.year,
      });
    } else {
      reset({
        categoryId: expenseCategories[0]?.id || "",
        amount: undefined,
        month: currentMonth,
        year: currentYear,
      });
    }
  }, [budgetToEdit, currentMonth, currentYear, reset, expenseCategories, open]);

  const onSubmit = async (data: BudgetFormValues) => {
    try {
      await onSave(data, budgetToEdit?.id);
      onOpenChange(false);
    } catch {
      // error handled by caller
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Ubah Batas Anggaran" : "Atur Anggaran Baru"}
          </DialogTitle>
          <DialogDescription>
            Tentukan plafon batas maksimal pengeluaran bulanan untuk kategori tertentu.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="budgetCateg" className="text-xs font-semibold">Kategori Pengeluaran</Label>
            <select
              id="budgetCateg"
              disabled={isEditing}
              className="w-full h-10 px-3 rounded-xl border border-border/80 bg-card text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-60"
              {...register("categoryId")}
            >
              <option value="" disabled>
                Pilih kategori...
              </option>
              {expenseCategories.map((c) => (
                <option key={c.id} value={c.id} className="bg-popover text-foreground">
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-xs text-[#FF6B5B] font-medium">{errors.categoryId.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="budgetAmount" className="text-xs font-semibold">Batas Maksimal Anggaran (Rupiah)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                Rp
              </span>
              <Input
                id="budgetAmount"
                type="number"
                placeholder="0"
                className="pl-10 font-mono text-base font-extrabold rounded-xl border-border/80 h-10"
                {...register("amount", { valueAsNumber: true })}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-[#FF6B5B] font-medium">{errors.amount.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4 flex flex-row items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl font-medium h-10"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-[#14213D] text-[#FAF7F2] hover:bg-[#1E2D4A] dark:bg-[#FF6B5B] dark:hover:bg-[#FF5542] dark:text-white font-bold h-10 px-5 shadow-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tetapkan Anggaran"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

