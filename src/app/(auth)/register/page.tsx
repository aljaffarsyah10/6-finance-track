"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { UserPlus, Loader2, AlertCircle } from "lucide-react";

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
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth.schema";
import { authApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";

export default function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setErrorMessage(null);
    try {
      await authApi.registerUser(values);

      toast.success("Akun berhasil dibuat! Masuk otomatis...");

      const loginResult = await signIn("credentials", {
        email: values.email.toLowerCase().trim(),
        password: values.password,
        redirect: false,
      });

      if (loginResult?.error) {
        toast.info("Pendaftaran berhasil. Silakan masuk dengan kredensial Anda.");
        router.push("/login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      const message = getErrorMessage(error);
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <Card className="premium-card rounded-2xl border border-border/80 bg-card shadow-lg">
      <CardHeader className="space-y-1.5 pb-4">
        <CardTitle className="text-xl font-extrabold text-foreground">Daftar Akun Baru</CardTitle>
        <CardDescription className="text-xs font-medium">
          Mulai kelola keuangan pribadi Anda dengan terencana, transparan, dan aman.
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
            <Label htmlFor="name" className="text-xs font-semibold">Nama Lengkap</Label>
            <Input
              id="name"
              placeholder="Nama Anda"
              disabled={isSubmitting}
              className="rounded-xl border-border/80 h-10 text-sm"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-[#FF6B5B] font-medium">{errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="password" className="text-xs font-semibold">Kata Sandi</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimal 8 karakter"
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
                Mendaftarkan...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 text-[#FF6B5B] dark:text-white" />
                Buat Akun
              </>
            )}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col gap-2 text-center text-xs text-muted-foreground border-t border-border/80 pt-4">
        <div>
          Sudah memiliki akun MoneyTrack?{" "}
          <Link
            href="/login"
            className="text-[#14213D] dark:text-[#FF6B5B] font-bold hover:underline"
          >
            Masuk Sekarang
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
