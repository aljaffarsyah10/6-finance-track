import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, PieChart, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#FF6B5B]/20">
      {/* Navigation Header */}
      <header className="border-b border-border/80 bg-background/80 dark:bg-[#0B111E]/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 rounded-xl bg-[#14213D] dark:bg-[#1E2D4A] text-[#FAF7F2] flex items-center justify-center font-bold shadow-xs">
              <Wallet className="h-5 w-5 text-[#FF6B5B]" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#FF6B5B] ring-2 ring-background" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-[#14213D] dark:text-[#FAF7F2]">
                MoneyTrack
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-[#FF6B5B]/15 text-[#FF6B5B] uppercase tracking-wider">
                PRO
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-semibold text-xs sm:text-sm">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-[#14213D] text-[#FAF7F2] dark:bg-[#FF6B5B] dark:text-white rounded-xl font-bold shadow-xs px-4">
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F4EDE4] text-[#14213D] dark:bg-[#1E2D4A] dark:text-[#FF6B5B] border border-border/80 mb-6 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-[#FF6B5B]" />
          <span>Precision Personal Finance Management</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 text-[#14213D] dark:text-[#FAF7F2] leading-[1.15]">
          Kelola Keuangan Pribadi dengan <span className="text-[#FF6B5B]">Akurasi Presisi</span> & Elegan
        </h1>
        
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 font-medium">
          Pantau saldo lintas rekening, pantau arus kas masuk dan keluar secara real-time, serta tetapkan batas anggaran bulanan tanpa risiko pembulatan desimal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
          <Link href="/register">
            <Button size="lg" className="h-12 px-7 gap-2 bg-[#14213D] text-[#FAF7F2] hover:bg-[#1E2D4A] dark:bg-[#FF6B5B] dark:hover:bg-[#FF5542] dark:text-white rounded-xl font-bold shadow-md transition-all active:scale-98">
              Mulai Gratis <ArrowRight className="h-4 w-4 text-[#FF6B5B] dark:text-white" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="h-12 px-7 rounded-xl font-bold border-border/80 bg-card hover:bg-[#F4EDE4] dark:hover:bg-[#1E2D4A] transition-all">
              Buka Live Dashboard
            </Button>
          </Link>
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
            <span>Kalkulasi Integer IDR Presisi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
            <span>Multi-Tenant Vault Terisolasi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#0D9488]" />
            <span>Ekspor CSV dengan Sanitasi Formula</span>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <Card className="premium-card rounded-2xl border border-border/80 bg-card hover:border-[#FF6B5B]/40 transition-all duration-200">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-[#14213D]/10 text-[#14213D] dark:bg-[#1E2D4A] dark:text-[#FF6B5B] flex items-center justify-center mb-3">
                <Wallet className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-bold text-foreground">Multi-Akun Keuangan</CardTitle>
              <CardDescription className="text-xs font-medium">
                Kelola saldo dompet kas, rekening bank, hingga e-wallet secara terpisah dalam satu tampilan terpadu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Saldo ter-update otomatis dari initial balance dan mutasi transaksi tanpa race condition.
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card rounded-2xl border border-border/80 bg-card hover:border-[#FF6B5B]/40 transition-all duration-200">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-[#0D9488]/12 text-[#0D9488] dark:bg-[#0D9488]/20 dark:text-[#2DD4BF] flex items-center justify-center mb-3">
                <TrendingUp className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-bold text-foreground">Pencatatan Transaksi</CardTitle>
              <CardDescription className="text-xs font-medium">
                Catat pemasukan dan pengeluaran dengan filter lanjutan rentang tanggal, kategori, dan rekening sumber.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Ekspor instan ke file CSV siap cetak dan olah dengan header UTF-8 BOM.
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card rounded-2xl border border-border/80 bg-card hover:border-[#FF6B5B]/40 transition-all duration-200">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-[#FF6B5B]/15 text-[#FF6B5B] flex items-center justify-center mb-3">
                <PieChart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-bold text-foreground">Anggaran & Analisis</CardTitle>
              <CardDescription className="text-xs font-medium">
                Tetapkan batas pengeluaran bulanan dengan sistem peringatan otomatis Terkendali, Waspada, dan Melebihi Batas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Visualisasi data analitik interaktif untuk evaluasi kesehatan finansial masa depan.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 py-6 text-center text-xs font-medium text-muted-foreground">
        <p>&copy; 2026 MoneyTrack. Built with Next.js 16, Tailwind CSS & PostgreSQL.</p>
      </footer>
    </div>
  );
}
