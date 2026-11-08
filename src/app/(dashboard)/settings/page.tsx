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
          <Card className="premium-card rounded-2xl border border-border/80 transition-all hover:border-[#FF6B5B]/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#14213D]/10 text-[#14213D] dark:bg-[#1E2D4A] dark:text-[#FF6B5B] border border-border/50">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-foreground group-hover:text-[#FF6B5B] transition-colors">
                    Profil & Keamanan Pengguna
                  </CardTitle>
                  <CardDescription className="text-xs font-medium">
                    Perbarui nama lengkap, alamat email, dan ubah kata sandi akun
                  </CardDescription>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#FF6B5B] transition-colors" />
            </CardHeader>
          </Card>
        </Link>

        {/* Theme Settings Card */}
        <Card className="premium-card rounded-2xl border border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold text-foreground">Tema Tampilan</CardTitle>
            <CardDescription className="text-xs font-medium">
              Pilih mode tampilan antarmuka yang paling nyaman untuk mata Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mounted ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className="gap-2 justify-center cursor-pointer rounded-xl font-bold h-11"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4 text-[#FF6B5B]" />
                  Mode Terang (Navy/Cream)
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className="gap-2 justify-center cursor-pointer rounded-xl font-bold h-11"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4 text-[#FF6B5B]" />
                  Mode Gelap (Midnight)
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  className="gap-2 justify-center cursor-pointer rounded-xl font-bold h-11"
                  onClick={() => setTheme("system")}
                >
                  <Laptop className="h-4 w-4" />
                  Ikuti Sistem
                </Button>
              </div>
            ) : (
              <div className="h-11 w-full bg-muted rounded-xl animate-pulse" />
            )}
          </CardContent>
        </Card>

        {/* Currency Card */}
        <Card className="premium-card rounded-2xl border border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#0D9488]/12 text-[#0D9488] dark:bg-[#0D9488]/20 dark:text-[#2DD4BF] border border-border/50">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  Preferensi Finansial & Mata Uang
                </CardTitle>
                <CardDescription className="text-xs font-medium">
                  Mata uang dasar: IDR (Rupiah Indonesia - Rp) dengan format integer tanpa floating-point rounding bug.
                </CardDescription>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F4EDE4] text-[#14213D] dark:bg-[#1E2D4A] dark:text-[#FAF7F2]">
              Default IDR
            </span>
          </CardHeader>
        </Card>

        {/* Danger Zone */}
        <Card className="premium-card rounded-2xl border border-[#FF6B5B]/30 bg-card">
          <CardHeader>
            <CardTitle className="text-base font-bold text-[#FF6B5B]">
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
