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
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Data Pribadi</CardTitle>
          <CardDescription>
            Nama lengkap digunakan untuk sapaan pada dashboard dan ringkasan finansial.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitProfile(onUpdateProfile)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                placeholder="Nama Lengkap Anda"
                disabled={isProfileSubmitting || profileLoading}
                {...registerProfile("name")}
              />
              {profileErrors.name && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {profileErrors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Alamat Email</Label>
              <Input
                id="email"
                type="email"
                value={session?.user?.email || "user@moneytrack.local"}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
              <p className="text-[11px] text-muted-foreground">
                Email digunakan sebagai identitas autentikasi utama dan tidak dapat diubah langsung.
              </p>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="sm"
                className="gap-2"
                disabled={isProfileSubmitting || profileLoading}
              >
                {isProfileSubmitting || profileLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Ganti Kata Sandi Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-semibold">Keamanan Kata Sandi</CardTitle>
          </div>
          <CardDescription>
            Gunakan kombinasi minimal 8 karakter dengan huruf dan angka untuk perlindungan optimal.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitPassword(onChangePassword)}>
          <CardContent className="space-y-4">
            {passwordSuccess && (
              <div className="flex items-center gap-2 p-3 text-xs text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-md">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Kata sandi Anda telah berhasil diperbarui dengan aman.</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                disabled={isPasswordSubmitting}
                {...registerPassword("currentPassword")}
              />
              {passwordErrors.currentPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Kata Sandi Baru</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Minimal 8 karakter"
                disabled={isPasswordSubmitting}
                {...registerPassword("newPassword")}
              />
              {passwordErrors.newPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Konfirmasi Kata Sandi Baru</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                placeholder="Ulangi kata sandi baru"
                disabled={isPasswordSubmitting}
                {...registerPassword("confirmNewPassword")}
              />
              {passwordErrors.confirmNewPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {passwordErrors.confirmNewPassword.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="gap-2"
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
