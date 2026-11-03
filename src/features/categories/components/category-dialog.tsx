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
  categorySchema,
  CategoryFormValues,
} from "@/lib/validations/category.schema";
import { Category } from "@/types";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultType?: "INCOME" | "EXPENSE";
  categoryToEdit?: Category | null;
  onSave: (data: CategoryFormValues, id?: string) => Promise<void> | void;
}

export function CategoryDialog({
  open,
  onOpenChange,
  defaultType = "EXPENSE",
  categoryToEdit,
  onSave,
}: CategoryDialogProps) {
  const isEditing = Boolean(categoryToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: defaultType,
      color: "#10b981",
    },
  });

  useEffect(() => {
    if (categoryToEdit) {
      reset({
        name: categoryToEdit.name,
        type: categoryToEdit.type,
        color: categoryToEdit.color || "#10b981",
      });
    } else {
      reset({
        name: "",
        type: defaultType,
        color: defaultType === "INCOME" ? "#10b981" : "#ef4444",
      });
    }
  }, [categoryToEdit, defaultType, reset, open]);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      await onSave(data, categoryToEdit?.id);
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
            {isEditing ? "Edit Kategori" : "Tambah Kategori Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Ubah nama atau tipe kategori transaksi."
              : "Buat pos kategori baru untuk pengelompokan transaksi."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="categoryName">Nama Kategori</Label>
            <Input
              id="categoryName"
              placeholder="Contoh: Belanja Bulanan, Transportasi"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="categoryType">Tipe Kategori</Label>
            <select
              id="categoryType"
              disabled={isEditing}
              className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-60"
              {...register("type")}
            >
              <option value="EXPENSE" className="bg-popover text-foreground">
                Pengeluaran
              </option>
              <option value="INCOME" className="bg-popover text-foreground">
                Pemasukan
              </option>
            </select>
            {errors.type && (
              <p className="text-xs text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="categoryColor">Warna Tag</Label>
            <div className="flex items-center gap-3">
              <input
                id="categoryColor"
                type="color"
                className="h-9 w-12 rounded cursor-pointer border border-input bg-transparent"
                {...register("color")}
              />
              <span className="text-xs text-muted-foreground">
                Pilih warna identitas kategori
              </span>
            </div>
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
              {isSubmitting ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan Kategori"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

