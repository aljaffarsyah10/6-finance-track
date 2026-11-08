"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
  transactionSchema,
  TransactionFormValues,
} from "@/lib/validations/transaction.schema";
import { Transaction, Account, Category } from "@/types";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: Account[];
  categories: Category[];
  transactionToEdit?: Transaction | null;
  onSave: (data: TransactionFormValues, id?: string) => Promise<void> | void;
}

export function TransactionDialog({
  open,
  onOpenChange,
  accounts,
  categories,
  transactionToEdit,
  onSave,
}: TransactionDialogProps) {
  const isEditing = Boolean(transactionToEdit);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "EXPENSE",
      amount: undefined,
      accountId: "",
      categoryId: "",
      transactionDate: "",
      description: "",
    },
  });

  const selectedType = useWatch({ control, name: "type" });

  useEffect(() => {
    if (transactionToEdit) {
      reset({
        type: transactionToEdit.type,
        amount: transactionToEdit.amount,
        accountId: transactionToEdit.accountId,
        categoryId: transactionToEdit.categoryId,
        transactionDate: transactionToEdit.transactionDate.split("T")[0],
        description: transactionToEdit.description || "",
      });
    } else {
      const today = new Date().toISOString().split("T")[0];
      reset({
        type: "EXPENSE",
        amount: undefined,
        accountId: accounts[0]?.id || "",
        categoryId: "",
        transactionDate: today,
        description: "",
      });
    }
  }, [transactionToEdit, reset, accounts, open]);

  const filteredCategories = categories.filter(
    (c) => c.type === selectedType
  );

  const onSubmit = async (data: TransactionFormValues) => {
    try {
      await onSave(data, transactionToEdit?.id);
      onOpenChange(false);
    } catch {
      // error handled by caller
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Transaksi" : "Catat Transaksi Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Ubah rincian transaksi keuangan Anda."
              : "Masukkan rincian transaksi pemasukan atau pengeluaran."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Segmented Type Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#F4EDE4] dark:bg-[#1E2D4A] rounded-xl">
            <button
              type="button"
              onClick={() => {
                setValue("type", "EXPENSE");
                setValue("categoryId", "");
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedType === "EXPENSE"
                  ? "bg-[#FF6B5B] text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pengeluaran (-)
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("type", "INCOME");
                setValue("categoryId", "");
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedType === "INCOME"
                  ? "bg-[#0D9488] text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pemasukan (+)
            </button>
          </div>

          {/* Amount Field */}
          <div className="space-y-1.5">
            <Label htmlFor="amount">Nominal (Rupiah)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                Rp
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                className="pl-10 text-lg font-mono font-bold"
                {...register("amount", { valueAsNumber: true })}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* Account Selection */}
          <div className="space-y-1.5">
            <Label htmlFor="accountId">Akun Keuangan</Label>
            <select
              id="accountId"
              className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              {...register("accountId")}
            >
              <option value="" disabled className="text-muted-foreground">
                Pilih akun...
              </option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id} className="text-foreground bg-popover">
                  {acc.name}
                </option>
              ))}
            </select>
            {errors.accountId && (
              <p className="text-xs text-red-500">{errors.accountId.message}</p>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-1.5">
            <Label htmlFor="categoryId">Kategori</Label>
            <select
              id="categoryId"
              className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              {...register("categoryId")}
            >
              <option value="" disabled>
                Pilih kategori...
              </option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id} className="text-foreground bg-popover">
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-xs text-red-500">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Date Field */}
          <div className="space-y-1.5">
            <Label htmlFor="transactionDate">Tanggal Transaksi</Label>
            <Input
              id="transactionDate"
              type="date"
              {...register("transactionDate")}
            />
            {errors.transactionDate && (
              <p className="text-xs text-red-500">
                {errors.transactionDate.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Keterangan / Catatan (Opsional)</Label>
            <Input
              id="description"
              placeholder="Contoh: Belanja bulanan supermarket"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4 flex flex-row items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Catat Transaksi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
