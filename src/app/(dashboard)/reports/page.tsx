import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart, TrendingUp, Calendar, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan & Analitik Finansial"
        description="Analisis arus kas, distribusi pengeluaran, dan rasio tabungan Anda."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          Tahun 2026
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Ekspor PDF / Excel
        </Button>
      </PageHeader>

      <Tabs defaultValue="cashflow" className="w-full">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="cashflow" className="gap-2 text-xs sm:text-sm">
            <BarChart3 className="h-4 w-4" />
            Arus Kas
          </TabsTrigger>
          <TabsTrigger value="expenses" className="gap-2 text-xs sm:text-sm">
            <PieChart className="h-4 w-4" />
            Pengeluaran
          </TabsTrigger>
          <TabsTrigger value="comparison" className="gap-2 text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4" />
            Komparasi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cashflow" className="mt-6">
          <Card>
            <CardContent className="p-8">
              <EmptyState
                title="Laporan Arus Kas Belum Tersedia"
                description="Kumpulkan minimal beberapa transaksi dalam sebulan untuk melihat visualisasi grafik arus kas bulanan."
                icon={<BarChart3 className="h-6 w-6" />}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <Card>
            <CardContent className="p-8">
              <EmptyState
                title="Laporan Pengeluaran Belum Tersedia"
                description="Grafik donat dan breakdown persentase kategori pengeluaran akan otomatis dihasilkan dari data transaksi."
                icon={<PieChart className="h-6 w-6" />}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <Card>
            <CardContent className="p-8">
              <EmptyState
                title="Komparasi Pemasukan vs Pengeluaran"
                description="Evaluasi rasio kesehatan finansial dan pertumbuhan tabungan Anda dari bulan ke bulan."
                icon={<TrendingUp className="h-6 w-6" />}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

