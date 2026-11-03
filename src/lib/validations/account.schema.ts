import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Nama akun wajib diisi").max(50, "Maksimal 50 karakter"),
  type: z.enum(["CASH", "BANK", "E_WALLET", "OTHER"]),
  initialBalance: z
    .number()
    .int("Saldo harus berupa bilangan bulat")
    .min(0, "Saldo awal tidak boleh negatif"),
});

export type AccountFormValues = z.infer<typeof accountSchema>;
