"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, KeyRound, Loader2, CheckCircle2 } from "lucide-react";
import { userApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import {
  updateProfileSchema,
  UpdateProfileFormValues,
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/lib/validations/user.schema";
import { toast } from "sonner";

export default function ProfileSettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    let ignore = false;
    async function loadUserProfile() {
      try {
        const profile = await userApi.fetchProfile();
        if (!ignore) {
          resetProfile({ name: profile.name });
        }
      } catch {
        if (!ignore && session?.user?.name) {
          resetProfile({ name: session.user.name });
        }
      }
    }
    loadUserProfile();
    return () => {
      ignore = true;
    };
  }, [resetProfile, session?.user?.name]);

  const onUpdateProfile = async (values: UpdateProfileFormValues) => {
    try {
      setProfileLoading(true);
      const updated = await userApi.updateProfile(values);
      toast.success("Profil Anda berhasil diperbarui.");
      if (updateSession) {
        await updateSession({ name: updated.name });
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProfileLoading(false);
    }
  };

  const onChangePassword = async (values: ChangePasswordFormValues) => {
    try {
      setPasswordSuccess(false);
      await userApi.changePassword(values);
      toast.success("Kata sandi berhasil diperbarui.");
      setPasswordSuccess(true);
      resetPassword({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="mb-2">
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pengaturan
        </Link>
      </div>

      <PageHeader
        title="Profil Pengguna"
        description="Kelola informasi personal dan keamanan kata sandi akun MoneyTrack Anda."
      />

      {/* Profil Info Card */}
      <Card className="premium-card rounded-2xl border border-border/80">
        <CardHeader>
          <CardTitle className="text-base font-bold text-foreground">Data Pribadi</CardTitle>
          <CardDescription className="text-xs font-medium">
            Nama lengkap digunakan untuk sapaan pada dashboard dan ringkasan finansial.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitProfile(onUpdateProfile)}>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold">Nama Lengkap</Label>
              <Input
                id="name"
                placeholder="Nama Lengkap Anda"
                disabled={isProfileSubmitting || profileLoading}
                className="rounded-xl border-border/80 h-10 text-sm"
                {...registerProfile("name")}
              />
              {profileErrors.name && (
                <p className="text-xs text-[#FF6B5B] font-medium">
                  {profileErrors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">Alamat Email</Label>
              <Input
                id="email"
                type="email"
                value={session?.user?.email || "user@moneytrack.local"}
                disabled
                className="bg-[#F4EDE4]/60 dark:bg-[#1E2D4A]/50 text-muted-foreground cursor-not-allowed rounded-xl border-border/80 h-10 text-sm"
              />
              <p className="text-[11px] text-muted-foreground">
                Email digunakan sebagai identitas autentikasi utama dan tidak dapat diubah langsung.
              </p>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="sm"
                className="gap-2 rounded-xl bg-[#14213D] hover:bg-[#1E2D4A] text-[#FAF7F2] dark:bg-[#FF6B5B] dark:hover:bg-[#FF5542] dark:text-white font-bold h-10 px-5 shadow-xs"
                disabled={isProfileSubmitting || profileLoading}
              >
                {isProfileSubmitting || profileLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-[#FF6B5B] dark:text-white" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 text-[#FF6B5B] dark:text-white" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Ganti Kata Sandi Card */}
      <Card className="premium-card rounded-2xl border border-border/80">
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-[#FF6B5B]" />
            <CardTitle className="text-base font-bold text-foreground">Keamanan Kata Sandi</CardTitle>
          </div>
          <CardDescription className="text-xs font-medium">
            Gunakan kombinasi minimal 8 karakter dengan huruf dan angka untuk perlindungan optimal.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitPassword(onChangePassword)}>
          <CardContent className="space-y-4">
            {passwordSuccess && (
              <div className="flex items-center gap-2 p-3 text-xs font-semibold text-[#0D9488] bg-[#0D9488]/10 border border-[#0D9488]/25 rounded-xl">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0D9488]" />
                <span>Kata sandi Anda telah berhasil diperbarui dengan aman.</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="currentPassword" className="text-xs font-semibold">Kata Sandi Saat Ini</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                disabled={isPasswordSubmitting}
                className="rounded-xl border-border/80 h-10 text-sm"
                {...registerPassword("currentPassword")}
              />
              {passwordErrors.currentPassword && (
                <p className="text-xs text-[#FF6B5B] font-medium">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="newPassword" className="text-xs font-semibold">Kata Sandi Baru</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Minimal 8 karakter"
                disabled={isPasswordSubmitting}
                className="rounded-xl border-border/80 h-10 text-sm"
                {...registerPassword("newPassword")}
              />
              {passwordErrors.newPassword && (
                <p className="text-xs text-[#FF6B5B] font-medium">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmNewPassword" className="text-xs font-semibold">Konfirmasi Kata Sandi Baru</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                placeholder="Ulangi kata sandi baru"
                disabled={isPasswordSubmitting}
                className="rounded-xl border-border/80 h-10 text-sm"
                {...registerPassword("confirmNewPassword")}
              />
              {passwordErrors.confirmNewPassword && (
                <p className="text-xs text-[#FF6B5B] font-medium">
                  {passwordErrors.confirmNewPassword.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="gap-2 rounded-xl font-bold h-10 px-5 shadow-xs border-border/80 hover:bg-[#F4EDE4] dark:hover:bg-[#1E2D4A]"
                disabled={isPasswordSubmitting}
              >
                {isPasswordSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memperbarui...
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    Perbarui Kata Sandi
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
