import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wallet, Landmark, Smartphone } from "lucide-react";

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Akun Keuangan"
        description="Kelola dompet kas tunai, rekening bank, hingga dompet digital (e-wallet)."
      >
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Akun
        </Button>
      </PageHeader>

      {/* Account Type Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kas Tunai (Cash)
            </CardTitle>
            <Wallet className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-mono">Rp 0</div>
            <p className="text-xs text-muted-foreground mt-1">Uang fisik di dompet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rekening Bank
            </CardTitle>
            <Landmark className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-mono">Rp 0</div>
            <p className="text-xs text-muted-foreground mt-1">BCA, Mandiri, BNI, dll.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              E-Wallet & Lainnya
            </CardTitle>
            <Smartphone className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-mono">Rp 0</div>
            <p className="text-xs text-muted-foreground mt-1">GoPay, OVO, ShopeePay, dll.</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List Shell */}
      <Card>
        <CardContent className="p-6">
          <EmptyState
            title="Belum Ada Akun Terdaftar"
            description="Tambahkan minimal satu akun kas atau rekening bank untuk mulai mencatat transaksi."
            icon={<Wallet className="h-6 w-6" />}
            action={
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Buat Akun Pertama
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

