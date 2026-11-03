"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { ErrorState } from "@/components/common/error-state";
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
  Trash2,
  Edit2,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { transactionsApi, accountsApi, categoriesApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import { TransactionDialog } from "@/features/transactions/components/transaction-dialog";
import { TransactionFormValues } from "@/lib/validations/transaction.schema";
import { formatIDR, formatDate } from "@/lib/utils";
import { Transaction, Account, Category, TransactionType } from "@/types";
import { toast } from "sonner";

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [accountFilter, setAccountFilter] = useState<string>("ALL");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load initial options (accounts, categories)
  useEffect(() => {
    let ignore = false;
    async function loadOptions() {
      try {
        const [accs, cats] = await Promise.all([
          accountsApi.fetchAccounts(),
          categoriesApi.fetchCategories(),
        ]);
        if (!ignore) {
          setAccounts(accs);
          setCategories(cats);
        }
      } catch (err) {
        console.error("Gagal memuat opsi akun dan kategori:", err);
      }
    }
    loadOptions();
    return () => {
      ignore = true;
    };
  }, []);

  // Fetch transactions from API
  useEffect(() => {
    let ignore = false;

    async function fetchTx() {
      try {
        const res = await transactionsApi.fetchTransactions({
          page: currentPage,
          limit: pageSize,
          search: searchQuery || undefined,
          type: typeFilter !== "ALL" ? (typeFilter as TransactionType) : undefined,
          accountId: accountFilter !== "ALL" ? accountFilter : undefined,
        });

        if (!ignore) {
          setTransactions(res.data);
          if (res.pagination) {
            setTotalPages(res.pagination.totalPages || 1);
            setTotalCount(res.pagination.total || 0);
          }
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchTx();

    return () => {
      ignore = true;
    };
  }, [currentPage, searchQuery, typeFilter, accountFilter, refreshTrigger]);

  const handleSaveTransaction = async (data: TransactionFormValues, id?: string) => {
    try {
      if (id) {
        await transactionsApi.updateTransaction(id, data);
        toast.success("Transaksi berhasil diperbarui.");
      } else {
        await transactionsApi.createTransaction(data);
        toast.success("Transaksi baru berhasil dicatat.");
      }
      setIsFormOpen(false);
      setTransactionToEdit(null);
      setLoading(true);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg);
      throw err;
    }
  };

  const handleDeleteTransaction = async () => {
    if (!transactionToDelete) return;
    setIsDeleting(true);
    try {
      await transactionsApi.deleteTransaction(transactionToDelete.id);
      toast.success("Transaksi berhasil dihapus.");
      setTransactionToDelete(null);
      setLoading(true);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Daftar Transaksi"
        description="Kelola dan telusuri seluruh riwayat pemasukan serta pengeluaran finansial Anda."
      >
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

      {/* Filter & Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari transaksi berdasarkan catatan atau deskripsi..."
              value={searchQuery}
              onChange={(e) => {
                setLoading(true);
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => {
                setLoading(true);
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-md border border-input bg-card px-3 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="ALL">Semua Tipe</option>
              <option value="INCOME">Pemasukan (+)</option>
              <option value="EXPENSE">Pengeluaran (-)</option>
            </select>

            <select
              value={accountFilter}
              onChange={(e) => {
                setLoading(true);
                setAccountFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-md border border-input bg-card px-3 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="ALL">Semua Akun</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Table Content */}
      <Card>
        {loading ? (
          <div className="p-6 space-y-4">
            <LoadingSkeleton variant="table-row" className="h-10" />
            <LoadingSkeleton variant="table-row" className="h-12" />
            <LoadingSkeleton variant="table-row" className="h-12" />
            <LoadingSkeleton variant="table-row" className="h-12" />
            <LoadingSkeleton variant="table-row" className="h-12" />
          </div>
        ) : error ? (
          <div className="p-6">
            <ErrorState
              title="Gagal Memuat Transaksi"
              description={error}
              onRetry={handleRetry}
            />
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState
            icon={<ArrowLeftRight className="h-10 w-10 text-muted-foreground" />}
            title="Tidak Ada Transaksi Ditemukan"
            description={
              searchQuery || typeFilter !== "ALL" || accountFilter !== "ALL"
                ? "Tidak ada transaksi yang cocok dengan kriteria filter atau pencarian Anda."
                : "Anda belum mencatat transaksi keuangan apapun. Mulai dengan mencatat transaksi pertama Anda."
            }
            actionLabel="Catat Transaksi Baru"
            onAction={() => {
              setTransactionToEdit(null);
              setIsFormOpen(true);
            }}
          />
        ) : (
          <div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Tanggal</TableHead>
                    <TableHead>Kategori & Deskripsi</TableHead>
                    <TableHead>Akun Keuangan</TableHead>
                    <TableHead className="text-right">Nominal (IDR)</TableHead>
                    <TableHead className="w-[100px] text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => {
                    const isIncome = tx.type === "INCOME";
                    return (
                      <TableRow key={tx.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(tx.transactionDate, "dd MMM yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`p-1.5 rounded-md shrink-0 ${
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
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground">
                                {tx.category?.name || "Tanpa Kategori"}
                              </p>
                              <p className="text-xs text-muted-foreground truncate max-w-xs sm:max-w-md">
                                {tx.description || "-"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-medium text-foreground whitespace-nowrap">
                          {tx.account?.name || "-"}
                        </TableCell>
                        <TableCell
                          className={`text-right text-xs font-bold font-mono tabular-nums whitespace-nowrap ${
                            isIncome
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {formatIDR(tx.amount, { type: tx.type })}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-foreground"
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
                              className="h-7 w-7 text-muted-foreground hover:text-red-600"
                              onClick={() => setTransactionToDelete(tx)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span className="sr-only">Hapus</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
              <span>
                Menampilkan {transactions.length} dari {totalCount} total transaksi
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={currentPage <= 1}
                  onClick={() => {
                    setLoading(true);
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-2 font-medium text-foreground">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={currentPage >= totalPages}
                  onClick={() => {
                    setLoading(true);
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Dialog Catat/Edit Transaksi */}
      <TransactionDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setTransactionToEdit(null);
        }}
        accounts={accounts}
        categories={categories}
        transactionToEdit={transactionToEdit}
        onSave={handleSaveTransaction}
      />

      {/* Dialog Konfirmasi Hapus Transaksi */}
      <ConfirmDialog
        open={Boolean(transactionToDelete)}
        onOpenChange={(open) => {
          if (!open) setTransactionToDelete(null);
        }}
        title="Hapus Catatan Transaksi"
        description={`Apakah Anda yakin ingin menghapus transaksi sebesar ${
          transactionToDelete ? formatIDR(transactionToDelete.amount) : ""
        }? Data yang dihapus tidak dapat dipulihkan.`}
        confirmLabel={isDeleting ? "Menghapus..." : "Ya, Hapus"}
        variant="destructive"
        onConfirm={handleDeleteTransaction}
      />
    </div>
  );
}
