import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, ShieldCheck, PieChart, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight">MoneyTrack</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-6">
          <ShieldCheck className="h-3.5 w-3.5" />
          Personal Finance Management Platform
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl mb-6">
          Kelola Keuangan Pribadi dengan Mudah & Terstruktur
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          MoneyTrack membantu Anda memantau pemasukan, pengeluaran, anggaran bulanan, dan saldo rekening dalam satu platform yang intuitif dan aman.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Mulai Gratis <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Buka Demo Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <Card>
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                <Wallet className="h-5 w-5" />
              </div>
              <CardTitle>Multi-Akun Keuangan</CardTitle>
              <CardDescription>
                Kelola saldo dompet kas, rekening bank, hingga e-wallet secara terpisah dalam satu tampilan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Saldo ter-update otomatis seiring pencatatan transaksi harian.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5" />
              </div>
              <CardTitle>Pencatatan Transaksi</CardTitle>
              <CardDescription>
                Catat pemasukan dan pengeluaran dengan kategori spesifik untuk memantau arus kas Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Filter cepat berdasarkan tanggal, kategori, dan akun.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                <PieChart className="h-5 w-5" />
              </div>
              <CardTitle>Anggaran & Analisis</CardTitle>
              <CardDescription>
                Tetapkan batas pengeluaran bulanan dan pantau persentase realisasi anggaran secara real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Visualisasi data interaktif untuk evaluasi kesehatan finansial.</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>&copy; 2026 MoneyTrack. Personal Finance Management Platform.</p>
      </footer>
    </div>
  );
}
