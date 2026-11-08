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
  ChevronsLeft,
  ChevronsRight,
  Download,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { transactionsApi, accountsApi, categoriesApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import { TransactionDialog } from "@/features/transactions/components/transaction-dialog";
import { TransactionFormValues } from "@/lib/validations/transaction.schema";
import { formatIDR, formatDate, cn } from "@/lib/utils";
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
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

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
          categoryId: categoryFilter !== "ALL" ? categoryFilter : undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        });

        if (!ignore) {
          const list = Array.isArray(res?.data)
            ? res.data
            : Array.isArray((res as unknown as { transactions?: Transaction[] })?.transactions)
            ? (res as unknown as { transactions: Transaction[] }).transactions
            : Array.isArray(res)
            ? (res as unknown as Transaction[])
            : [];
          setTransactions(list);
          const pagination =
            res?.pagination ||
            (res as unknown as { pagination?: { totalPages?: number; total?: number } })?.pagination;
          if (pagination) {
            setTotalPages(pagination.totalPages || 1);
            setTotalCount(pagination.total || 0);
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
  }, [
    currentPage,
    pageSize,
    searchQuery,
    typeFilter,
    accountFilter,
    categoryFilter,
    startDate,
    endDate,
    refreshTrigger,
  ]);

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

  const handleResetFilters = () => {
    setLoading(true);
    setSearchQuery("");
    setTypeFilter("ALL");
    setAccountFilter("ALL");
    setCategoryFilter("ALL");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const handleExportCsv = async () => {
    try {
      setIsExporting(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (typeFilter !== "ALL") params.append("type", typeFilter);
      if (accountFilter !== "ALL") params.append("accountId", accountFilter);
      if (categoryFilter !== "ALL") params.append("categoryId", categoryFilter);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const url = `/api/transactions/export?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Gagal mengunduh file CSV transaksi.");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      const today = new Date().toISOString().split("T")[0];
      a.download = `moneytrack-transaksi-${today}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("File CSV transaksi berhasil diekspor.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsExporting(false);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    typeFilter !== "ALL" ||
    accountFilter !== "ALL" ||
    categoryFilter !== "ALL" ||
    startDate !== "" ||
    endDate !== "";

  const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader
        title="Daftar Transaksi"
        description="Kelola, telusuri, dan ekspor riwayat arus kas pemasukan dan pengeluaran Anda."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 cursor-pointer shadow-xs hover:border-[#FF6B5B]/40"
            onClick={handleExportCsv}
            disabled={isExporting}
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Mengekspor..." : "Ekspor CSV"}
          </Button>

          <Button
            size="sm"
            className="gap-2 bg-gradient-to-r from-[#14213D] to-[#1E2D4A] dark:from-[#FF6B5B] dark:to-[#FF5542] text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer rounded-xl"
            onClick={() => {
              setTransactionToEdit(null);
              setIsFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4 text-[#FF6B5B] dark:text-white" />
            Catat Transaksi
          </Button>
        </div>
      </PageHeader>

      {/* Filter & Search Bar */}
      <Card className="premium-card p-4 space-y-3 rounded-2xl border border-border/80 bg-gradient-to-br from-card/95 via-card/85 to-card/75 backdrop-blur-xl shadow-lg">
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
              aria-label="Pencarian catatan transaksi"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
            <select
              value={typeFilter}
              onChange={(e) => {
                setLoading(true);
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-md border border-input bg-card px-3 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Filter tipe transaksi"
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
              aria-label="Filter akun keuangan"
            >
              <option value="ALL">Semua Akun</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setLoading(true);
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-md border border-input bg-card px-3 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Filter kategori"
            >
              <option value="ALL">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.type === "INCOME" ? "+" : "-"})
                </option>
              ))}
            </select>

            <Button
              variant="outline"
              size="sm"
              className={`gap-1.5 h-9 text-xs ${showAdvancedFilters ? "bg-muted" : ""}`}
              onClick={() => setShowAdvancedFilters((prev) => !prev)}
              aria-label="Filter tanggal lanjutan"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Tanggal</span>
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 h-9 text-xs text-muted-foreground hover:text-foreground"
                onClick={handleResetFilters}
                title="Reset semua filter"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Date Range Filter */}
        {showAdvancedFilters && (
          <div className="pt-2 border-t border-border flex flex-wrap items-center gap-3 text-xs">
            <span className="text-muted-foreground font-semibold">Rentang Tanggal:</span>
            <div className="flex items-center gap-2">
              <label htmlFor="startDate" className="text-muted-foreground">Dari:</label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setLoading(true);
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-8 w-36 text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="endDate" className="text-muted-foreground">Sampai:</label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setLoading(true);
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-8 w-36 text-xs"
              />
            </div>
            {(startDate || endDate) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-[11px] text-muted-foreground"
                onClick={() => {
                  setLoading(true);
                  setStartDate("");
                  setEndDate("");
                  setCurrentPage(1);
                }}
              >
                Hapus Tanggal
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Table Content */}
      <Card className="premium-card rounded-2xl border border-border/80 overflow-hidden animate-fade-in-up">
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
        ) : (transactions || []).length === 0 ? (
          <EmptyState
            icon={<ArrowLeftRight className="h-10 w-10 text-muted-foreground" />}
            title="Tidak Ada Transaksi Ditemukan"
            description={
              hasActiveFilters
                ? "Tidak ada transaksi yang cocok dengan kriteria filter atau pencarian Anda."
                : "Anda belum mencatat transaksi keuangan apapun. Mulai dengan mencatat transaksi pertama Anda."
            }
            actionLabel={hasActiveFilters ? "Reset Filter" : "Catat Transaksi Baru"}
            onAction={
              hasActiveFilters
                ? handleResetFilters
                : () => {
                    setTransactionToEdit(null);
                    setIsFormOpen(true);
                  }
            }
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
                  {(transactions || []).map((tx) => {
                    const isIncome = tx.type === "INCOME";
                    return (
                      <TableRow key={tx.id} className="hover:bg-[#F4EDE4]/60 dark:hover:bg-[#1E2D4A]/50 transition-colors group">
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(tx.transactionDate, "dd MMM yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`p-2 rounded-xl shrink-0 ${
                                isIncome
                                  ? "bg-[#0D9488]/12 text-[#0D9488] dark:bg-[#0D9488]/20 dark:text-[#2DD4BF]"
                                  : "bg-[#FF6B5B]/12 text-[#FF6B5B] dark:bg-[#FF6B5B]/20 dark:text-[#FF6B5B]"
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
                        <TableCell className="text-right whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-mono font-extrabold tabular-nums border shadow-xs transition-colors",
                              isIncome
                                ? "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20 dark:bg-[#0D9488]/20 dark:text-[#2DD4BF] dark:border-[#2DD4BF]/30"
                                : "bg-[#FF6B5B]/10 text-[#FF6B5B] border-[#FF6B5B]/20 dark:bg-[#FF6B5B]/20 dark:text-[#FF6B5B] dark:border-[#FF6B5B]/30"
                            )}
                          >
                            {formatIDR(tx.amount, { type: tx.type })}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
                              onClick={() => {
                                setTransactionToEdit(tx);
                                setIsFormOpen(true);
                              }}
                              aria-label="Edit transaksi"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-red-600 cursor-pointer"
                              onClick={() => setTransactionToDelete(tx)}
                              aria-label="Hapus transaksi"
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>
                  Menampilkan {startIndex} - {endIndex} dari {totalCount} total transaksi
                </span>
                <div className="flex items-center gap-1.5">
                  <span>Per baris:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setLoading(true);
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="h-7 rounded border border-input bg-card px-2 text-xs"
                    aria-label="Jumlah transaksi per halaman"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={currentPage <= 1}
                  onClick={() => {
                    setLoading(true);
                    setCurrentPage(1);
                  }}
                  title="Halaman Pertama"
                  aria-label="Halaman Pertama"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={currentPage <= 1}
                  onClick={() => {
                    setLoading(true);
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                  title="Halaman Sebelumnya"
                  aria-label="Halaman Sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-3 font-medium text-foreground">
                  {currentPage} / {totalPages}
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
                  title="Halaman Berikutnya"
                  aria-label="Halaman Berikutnya"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={currentPage >= totalPages}
                  onClick={() => {
                    setLoading(true);
                    setCurrentPage(totalPages);
                  }}
                  title="Halaman Terakhir"
                  aria-label="Halaman Terakhir"
                >
                  <ChevronsRight className="h-4 w-4" />
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
