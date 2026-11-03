import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z
    .number()
    .int("Nominal harus berupa bilangan bulat")
    .positive("Nominal harus lebih dari 0"),
  accountId: z.string().min(1, "Akun harus dipilih"),
  categoryId: z.string().min(1, "Kategori harus dipilih"),
  transactionDate: z.string().min(1, "Tanggal transaksi wajib diisi"),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter").optional(),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
