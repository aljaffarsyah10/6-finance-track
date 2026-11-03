import { z } from "zod";

export const budgetSchema = z.object({
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  amount: z
    .number()
    .int("Batas anggaran harus berupa bilangan bulat")
    .positive("Batas anggaran harus lebih dari 0"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;
