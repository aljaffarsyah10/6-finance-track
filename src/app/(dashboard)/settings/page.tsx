"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, ChevronRight, Moon, Sun, Laptop } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Pengaturan Aplikasi"
        description="Kelola akun, preferensi tema tampilan, mata uang, dan keamanan sesi Anda."
      />

      <div className="grid gap-4">
        {/* Profile Card */}
        <Link href="/settings/profile" className="block group">
          <Card className="transition-colors hover:border-primary/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                    Profil & Keamanan Pengguna
                  </CardTitle>
                  <CardDescription>
                    Perbarui nama lengkap, alamat email, dan ubah kata sandi akun
                  </CardDescription>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
          </Card>
        </Link>

        {/* Theme Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Tema Tampilan</CardTitle>
            <CardDescription>
              Pilih mode tampilan antarmuka yang paling nyaman untuk mata Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mounted ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className="gap-2 justify-center cursor-pointer"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4" />
                  Mode Terang
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className="gap-2 justify-center cursor-pointer"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4" />
                  Mode Gelap
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  className="gap-2 justify-center cursor-pointer"
                  onClick={() => setTheme("system")}
                >
                  <Laptop className="h-4 w-4" />
                  Ikuti Sistem
                </Button>
              </div>
            ) : (
              <div className="h-9 w-full bg-muted rounded animate-pulse" />
            )}
          </CardContent>
        </Card>

        {/* Currency Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">
                  Preferensi Finansial & Mata Uang
                </CardTitle>
                <CardDescription>
                  Mata uang dasar: IDR (Rupiah Indonesia - Rp) dengan format integer tanpa floating-point rounding bug.
                </CardDescription>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
              Default
            </span>
          </CardHeader>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-950">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-red-600 dark:text-red-400">
              Zona Bahaya
            </CardTitle>
            <CardDescription>
              Tindakan di bawah ini akan mengakhiri sesi aktif Anda pada perangkat ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Keluar dari Akun</p>
              <p className="text-xs text-muted-foreground">
                Sesi Anda saat ini akan diakhiri dan dialihkan ke halaman login.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
            >
              Keluar (Logout)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
