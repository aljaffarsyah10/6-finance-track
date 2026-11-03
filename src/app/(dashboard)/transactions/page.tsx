import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  ArrowLeftRight,
  Download,
} from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Riwayat Transaksi"
        description="Kelola seluruh catatan pemasukan dan pengeluaran finansial Anda."
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Ekspor
        </Button>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Catat Transaksi
        </Button>
      </PageHeader>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari transaksi berdasarkan catatan atau keterangan..."
              className="pl-9 w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Akun</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="h-48 text-center">
                  <EmptyState
                    title="Tidak Ada Transaksi Ditemukan"
                    description="Belum ada transaksi yang tercatat dalam periode filter saat ini."
                    icon={<ArrowLeftRight className="h-6 w-6" />}
                    action={
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Tambah Transaksi Pertama
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

