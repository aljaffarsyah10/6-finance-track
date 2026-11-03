"use client";

import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
  ArrowLeftRight,
  Download,
  Trash2,
  Edit2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { mockTransactions } from "@/features/transactions/mocks/transactions.mock";
import { mockAccounts } from "@/features/accounts/mocks/accounts.mock";
import { mockCategories } from "@/features/categories/mocks/categories.mock";
import { TransactionDialog } from "@/features/transactions/components/transaction-dialog";
import { TransactionFormValues } from "@/lib/validations/transaction.schema";
import { formatIDR, formatDate } from "@/lib/utils";
import { Transaction } from "@/types";
import { toast } from "sonner";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [accountFilter, setAccountFilter] = useState<string>("ALL");

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        searchQuery === "" ||
        tx.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.account?.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "ALL" || tx.type === typeFilter;
      const matchesAccount = accountFilter === "ALL" || tx.accountId === accountFilter;

      return matchesSearch && matchesType && matchesAccount;
    });
  }, [transactions, searchQuery, typeFilter, accountFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSaveTransaction = (data: TransactionFormValues, id?: string) => {
    if (id) {
      // Edit
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === id
            ? {
                ...tx,
                type: data.type,
                amount: data.amount,
                accountId: data.accountId,
                categoryId: data.categoryId,
                transactionDate: new Date(data.transactionDate).toISOString(),
                description: data.description || "",
                account: mockAccounts.find((a) => a.id === data.accountId),
                category: mockCategories.find((c) => c.id === data.categoryId),
              }
            : tx
        )
      );
    } else {
      // Add
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        userId: "user_demo",
        accountId: data.accountId,
        categoryId: data.categoryId,
        type: data.type,
        amount: data.amount,
        description: data.description || "",
        transactionDate: new Date(data.transactionDate).toISOString(),
        account: mockAccounts.find((a) => a.id === data.accountId),
        category: mockCategories.find((c) => c.id === data.categoryId),
        createdAt: new Date().toISOString(),
      };
      setTransactions((prev) => [newTx, ...prev]);
    }
  };

  const handleDelete = () => {
    if (!transactionToDelete) return;
    setTransactions((prev) => prev.filter((tx) => tx.id !== transactionToDelete.id));
    toast.success("Transaksi berhasil dihapus");
    setTransactionToDelete(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Riwayat Transaksi"
        description="Kelola seluruh catatan pemasukan dan pengeluaran finansial Anda."
      >
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => toast.info("Fitur ekspor laporan tersedia pada Phase 8")}
        >
          <Download className="h-4 w-4" />
          Ekspor
        </Button>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => {
            setTransactionToEdit(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Catat Transaksi
        </Button>
      </PageHeader>

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari transaksi berdasarkan catatan, kategori, atau akun..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 w-full"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter berdasarkan tipe transaksi"
              className="h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus:outline-none"
            >
              <option value="ALL" className="bg-popover text-foreground">Semua Tipe</option>
              <option value="EXPENSE" className="bg-popover text-foreground">Pengeluaran (-)</option>
              <option value="INCOME" className="bg-popover text-foreground">Pemasukan (+)</option>
            </select>

            <select
              value={accountFilter}
              onChange={(e) => {
                setAccountFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter berdasarkan akun keuangan"
              className="h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-xs focus:outline-none"
            >
              <option value="ALL" className="bg-popover text-foreground">Semua Akun</option>
              {mockAccounts.map((a) => (
                <option key={a.id} value={a.id} className="bg-popover text-foreground">
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Transaction Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Tanggal</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Akun</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
                <TableHead className="text-right w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <EmptyState
                      title="Tidak Ada Transaksi Ditemukan"
                      description="Tidak ada transaksi yang cocok dengan kriteria filter atau pencarian Anda."
                      icon={<ArrowLeftRight className="h-6 w-6" />}
                      action={
                        <Button
                          size="sm"
                          onClick={() => {
                            setSearchQuery("");
                            setTypeFilter("ALL");
                            setAccountFilter("ALL");
                          }}
                        >
                          Reset Filter
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map((tx) => {
                  const isIncome = tx.type === "INCOME";
                  return (
                    <TableRow key={tx.id} className="hover:bg-muted/40 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(tx.transactionDate, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span
                            className={`p-1 rounded-md shrink-0 ${
                              isIncome
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                                : "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                            }`}
                          >
                            {isIncome ? (
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowDownRight className="h-3.5 w-3.5" />
                            )}
                          </span>
                          <span className="line-clamp-1">{tx.description || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                          <span
                            className="h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: tx.category?.color || "#888" }}
                          />
                          {tx.category?.name || "Kategori"}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {tx.account?.name || "Akun"}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono font-bold tabular-nums whitespace-nowrap ${
                          isIncome
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {formatIDR(tx.amount, { type: tx.type })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              setTransactionToEdit(tx);
                              setIsFormOpen(true);
                            }}
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-600"
                            onClick={() => setTransactionToDelete(tx)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {filteredTransactions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-border text-xs text-muted-foreground">
            <div>
              Menampilkan{" "}
              <span className="font-semibold text-foreground">
                {(currentPage - 1) * pageSize + 1}-
                {Math.min(currentPage * pageSize, filteredTransactions.length)}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-foreground">
                {filteredTransactions.length}
              </span>{" "}
              transaksi
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                Sebelumnya
              </Button>
              <div className="px-3 font-semibold text-foreground">
                Halaman {currentPage} dari {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Transaction Add/Edit Dialog */}
      <TransactionDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        accounts={mockAccounts}
        categories={mockCategories}
        transactionToEdit={transactionToEdit}
        onSave={handleSaveTransaction}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(transactionToDelete)}
        onOpenChange={(open) => !open && setTransactionToDelete(null)}
        title="Hapus Transaksi"
        description={`Apakah Anda yakin ingin menghapus transaksi "${transactionToDelete?.description || "ini"}" senilai ${formatIDR(
          transactionToDelete?.amount || 0
        )}? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus Transaksi"
        onConfirm={handleDelete}
      />
    </div>
  );
}
