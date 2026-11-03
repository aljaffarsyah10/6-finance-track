import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Pengaturan Aplikasi"
        description="Kelola akun, preferensi mata uang, dan tampilan antarmuka MoneyTrack."
      />

      <div className="grid gap-4">
        <Link href="/settings/profile" className="block group">
          <Card className="transition-colors hover:border-primary/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                    Profil Pengguna
                  </CardTitle>
                  <CardDescription>
                    Perbarui nama lengkap, alamat email, dan kata sandi akun
                  </CardDescription>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
          </Card>
        </Link>

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
                  Mata uang dasar: IDR (Rupiah Indonesia - Rp)
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
              Tindakan di bawah ini akan mengakhiri sesi aktif atau menghapus data Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Keluar dari Akun</p>
              <p className="text-xs text-muted-foreground">
                Sesi Anda saat ini akan diakhiri pada perangkat ini.
              </p>
            </div>
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30">
                Keluar (Logout)
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
