import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Target, Calendar } from "lucide-react";

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Anggaran Bulanan"
        description="Batasi dan kendalikan pos pengeluaran bulanan berdasarkan kategori."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          November 2026
        </Button>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Atur Anggaran
        </Button>
      </PageHeader>

      {/* Budget Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Ringkasan Anggaran Periode Ini
          </CardTitle>
          <CardDescription>
            Total alokasi batas pengeluaran vs realisasi berjalan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground">Total Anggaran</p>
              <p className="text-xl font-bold font-mono">Rp 0</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Realisasi</p>
              <p className="text-xl font-bold font-mono text-red-600 dark:text-red-400">
                Rp 0
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sisa Anggaran</p>
              <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                Rp 0
              </p>
            </div>
          </div>

          <div className="pt-6">
            <EmptyState
              title="Belum Ada Anggaran Kategori"
              description="Tetapkan alokasi anggaran pada setiap kategori pengeluaran Anda untuk bulan ini."
              icon={<Target className="h-6 w-6" />}
              action={
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Anggaran Kategori
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

