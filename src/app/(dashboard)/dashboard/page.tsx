import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { SummaryCard } from "@/components/common/summary-card";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Scale,
  Plus,
  ArrowRight,
  ArrowLeftRight,
  PieChart,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ringkasan Finansial"
        description="Pantau kondisi saldo rekening, pemasukan, pengeluaran, dan progres anggaran Anda."
      >
        <Link href="/transactions">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Catat Transaksi
          </Button>
        </Link>
      </PageHeader>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Saldo"
          value="Rp 0"
          description="Dari seluruh akun keuangan aktif"
          icon={<Wallet className="h-5 w-5" />}
          variant="default"
        />
        <SummaryCard
          title="Pemasukan Bulan Ini"
          value="Rp 0"
          description="Bulan berjalan"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="income"
        />
        <SummaryCard
          title="Pengeluaran Bulan Ini"
          value="Rp 0"
          description="Bulan berjalan"
          icon={<TrendingDown className="h-5 w-5" />}
          variant="expense"
        />
        <SummaryCard
          title="Arus Kas Bersih"
          value="Rp 0"
          description="Net Cash Flow periode ini"
          icon={<Scale className="h-5 w-5" />}
          variant="warning"
        />
      </div>

      {/* Charts & Analytical Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Tren Arus Kas Bulanan
            </CardTitle>
            <CardDescription>
              Perbandingan pemasukan vs pengeluaran 6 bulan terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="Belum Ada Data Arus Kas"
              description="Grafik arus kas akan otomatis terisi setelah Anda mencatat transaksi pemasukan atau pengeluaran."
              icon={<ArrowLeftRight className="h-6 w-6" />}
              action={
                <Link href="/transactions">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    Mulai Catat Transaksi
                  </Button>
                </Link>
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Proporsi Pengeluaran
            </CardTitle>
            <CardDescription>
              Distribusi pengeluaran per kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="Belum Ada Pengeluaran"
              description="Visualisasi kategori akan muncul begitu transaksi pengeluaran pertama dicatat."
              icon={<PieChart className="h-6 w-6" />}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions & Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Transaksi Terkini
              </CardTitle>
              <CardDescription>5 aktivitas transaksi terakhir</CardDescription>
            </div>
            <Link href="/transactions">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="Belum Ada Transaksi"
              description="Riwayat transaksi harian Anda akan ditampilkan di sini."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Progres Anggaran Bulan Ini
              </CardTitle>
              <CardDescription>Pemantauan batas pengeluaran</CardDescription>
            </div>
            <Link href="/budgets">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Kelola Anggaran <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="Belum Ada Anggaran Disiapkan"
              description="Tetapkan batas pengeluaran bulanan agar kondisi finansial tetap sehat dan terkontrol."
              action={
                <Link href="/budgets">
                  <Button variant="outline" size="sm">
                    Buat Anggaran Baru
                  </Button>
                </Link>
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

