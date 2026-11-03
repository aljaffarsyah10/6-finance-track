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
  accountSchema,
  AccountFormValues,
} from "@/lib/validations/account.schema";
import { Account } from "@/types";
import { toast } from "sonner";

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountToEdit?: Account | null;
  onSave: (data: AccountFormValues, id?: string) => void;
}

export function AccountDialog({
  open,
  onOpenChange,
  accountToEdit,
  onSave,
}: AccountDialogProps) {
  const isEditing = Boolean(accountToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "BANK",
      initialBalance: 0,
    },
  });

  useEffect(() => {
    if (accountToEdit) {
      reset({
        name: accountToEdit.name,
        type: accountToEdit.type,
        initialBalance: accountToEdit.initialBalance,
      });
    } else {
      reset({
        name: "",
        type: "BANK",
        initialBalance: 0,
      });
    }
  }, [accountToEdit, reset, open]);

  const onSubmit = (data: AccountFormValues) => {
    onSave(data, accountToEdit?.id);
    toast.success(
      isEditing ? "Akun berhasil diperbarui" : "Akun baru berhasil dibuat"
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Akun Keuangan" : "Tambah Akun Keuangan"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Perbarui nama atau tipe akun keuangan Anda."
              : "Tambahkan dompet fisik, rekening bank, atau e-wallet baru."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="accountName">Nama Akun</Label>
            <Input
              id="accountName"
              placeholder="Contoh: Bank BCA, Dompet Kas, GoPay"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="accountType">Jenis / Tipe Akun</Label>
            <select
              id="accountType"
              className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              {...register("type")}
            >
              <option value="BANK" className="bg-popover text-foreground">
                Rekening Bank
              </option>
              <option value="CASH" className="bg-popover text-foreground">
                Uang Kas Tunai (Cash)
              </option>
              <option value="E_WALLET" className="bg-popover text-foreground">
                Dompet Digital (E-Wallet)
              </option>
              <option value="OTHER" className="bg-popover text-foreground">
                Lainnya
              </option>
            </select>
            {errors.type && (
              <p className="text-xs text-red-500">{errors.type.message}</p>
            )}
          </div>

          {!isEditing && (
            <div className="space-y-1.5">
              <Label htmlFor="initialBalance">Saldo Awal (Rupiah)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                  Rp
                </span>
                <Input
                  id="initialBalance"
                  type="number"
                  placeholder="0"
                  className="pl-10 font-mono"
                  {...register("initialBalance", { valueAsNumber: true })}
                />
              </div>
              {errors.initialBalance && (
                <p className="text-xs text-red-500">
                  {errors.initialBalance.message}
                </p>
              )}
            </div>
          )}

          <DialogFooter className="pt-4 flex flex-row items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan Akun"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
