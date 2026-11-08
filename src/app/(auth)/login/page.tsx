"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { LogIn, Loader2, AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth.schema";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setErrorMessage(null);
    try {
      const result = await signIn("credentials", {
        email: values.email.toLowerCase().trim(),
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("Email atau kata sandi yang Anda masukkan salah.");
        toast.error("Gagal masuk. Periksa kembali email dan kata sandi Anda.");
        return;
      }

      toast.success("Login berhasil! Mengalihkan ke dashboard...");
      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Terjadi kesalahan koneksi server. Silakan coba lagi.");
      toast.error("Gagal terhubung ke layanan autentikasi.");
    }
  };

  return (
    <Card className="premium-card rounded-2xl border border-border/80 bg-card shadow-lg">
      <CardHeader className="space-y-1.5 pb-4">
        <CardTitle className="text-xl font-extrabold text-foreground">Masuk ke Akun</CardTitle>
        <CardDescription className="text-xs font-medium">
          Masukkan email dan kata sandi Anda untuk mengakses dashboard keuangan.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 text-xs font-semibold text-[#FF6B5B] bg-[#FF6B5B]/10 border border-[#FF6B5B]/25 rounded-xl">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              disabled={isSubmitting}
              className="rounded-xl border-border/80 h-10 text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-[#FF6B5B] font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold">Kata Sandi</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isSubmitting}
              className="rounded-xl border-border/80 h-10 text-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-[#FF6B5B] font-medium">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full gap-2 mt-2 h-11 rounded-xl bg-[#14213D] hover:bg-[#1E2D4A] text-[#FAF7F2] dark:bg-[#FF6B5B] dark:hover:bg-[#FF5542] dark:text-white font-bold shadow-xs transition-all active:scale-98"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#FF6B5B] dark:text-white" />
                Memproses...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 text-[#FF6B5B] dark:text-white" />
                Masuk
              </>
            )}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col gap-2 text-center text-xs text-muted-foreground border-t border-border/80 pt-4">
        <div>
          Belum memiliki akun MoneyTrack?{" "}
          <Link
            href="/register"
            className="text-[#14213D] dark:text-[#FF6B5B] font-bold hover:underline"
          >
            Daftar Sekarang
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
