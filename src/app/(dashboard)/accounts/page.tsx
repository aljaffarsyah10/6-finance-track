"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/page-header";
import { SummaryCard } from "@/components/common/summary-card";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { ErrorState } from "@/components/common/error-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wallet, Landmark, Smartphone, Edit2, Trash2, CreditCard } from "lucide-react";
import { accountsApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import { AccountDialog } from "@/features/accounts/components/account-dialog";
import { AccountFormValues } from "@/lib/validations/account.schema";
import { formatIDR, cn } from "@/lib/utils";
import { Account } from "@/types";
import { toast } from "sonner";

export default function AccountsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadAccounts() {
      try {
        const data = await accountsApi.fetchAccounts();
        if (!ignore) {
          setAccounts(Array.isArray(data) ? data : []);
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

    loadAccounts();

    return () => {
      ignore = true;
    };
  }, [refreshTrigger]);

  const totalBalance = (accounts || []).reduce(
    (sum, acc) => sum + (acc.currentBalance ?? acc.initialBalance),
    0
  );

  const getAccountIcon = (type: Account["type"]) => {
    switch (type) {
      case "BANK":
        return <Landmark className="h-5 w-5 text-blue-600" />;
      case "E_WALLET":
        return <Smartphone className="h-5 w-5 text-purple-600" />;
      case "OTHER":
        return <CreditCard className="h-5 w-5 text-amber-600" />;
      case "CASH":
      default:
        return <Wallet className="h-5 w-5 text-emerald-600" />;
    }
  };

  const getAccountBadge = (type: Account["type"]) => {
    switch (type) {
      case "BANK":
        return "Bank";
      case "E_WALLET":
        return "E-Wallet";
      case "CASH":
        return "Kas Tunai";
      default:
        return "Lainnya";
    }
  };

  const handleSaveAccount = async (data: AccountFormValues, id?: string) => {
    try {
      if (id) {
        await accountsApi.updateAccount(id, data);
        toast.success("Akun keuangan berhasil diperbarui.");
      } else {
        await accountsApi.createAccount(data);
        toast.success("Akun keuangan baru berhasil ditambahkan.");
      }
      setIsDialogOpen(false);
      setAccountToEdit(null);
      setLoading(true);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!accountToDelete) return;
    setIsDeleting(true);
    try {
      await accountsApi.deleteAccount(accountToDelete.id);
      toast.success("Akun keuangan berhasil dihapus.");
      setAccountToDelete(null);
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
        title="Akun Keuangan"
        description="Kelola dompet kas tunai, rekening bank, hingga dompet digital (e-wallet)."
      >
        <Button
          size="sm"
          className="gap-2"
          onClick={() => {
            setAccountToEdit(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Tambah Akun
        </Button>
      </PageHeader>

      {/* Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Kekayaan Bersih (Net Worth)"
          value={formatIDR(totalBalance)}
          description={`Akumulasi saldo dari ${(accounts || []).length} akun aktif`}
          icon={<Wallet className="h-5 w-5" />}
        />
      </div>

      {/* Accounts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LoadingSkeleton variant="card" className="h-40" />
          <LoadingSkeleton variant="card" className="h-40" />
          <LoadingSkeleton variant="card" className="h-40" />
        </div>
      ) : error ? (
        <ErrorState
          title="Gagal Memuat Akun Keuangan"
          description={error}
          onRetry={handleRetry}
        />
      ) : (accounts || []).length === 0 ? (
        <EmptyState
          icon={<Wallet className="h-10 w-10 text-muted-foreground" />}
          title="Belum Ada Akun Keuangan"
          description="Tambahkan rekening bank atau dompet tunai Anda untuk mulai mencatat dan mengelola keuangan."
          actionLabel="Tambah Akun Pertama"
          onAction={() => {
            setAccountToEdit(null);
            setIsDialogOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-up">
          {accounts.map((acc) => {
            const currentBal = acc.currentBalance ?? acc.initialBalance;
            return (
              <Card
                key={acc.id}
                className="group premium-card relative overflow-hidden rounded-2xl border border-border/80 bg-card hover:border-[#FF6B5B]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Decorative card glow background */}
                <div
                  className={cn(
                    "pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-70",
                    acc.type === "BANK" && "bg-blue-500/30",
                    acc.type === "E_WALLET" && "bg-[#FF6B5B]/30",
                    acc.type === "CASH" && "bg-emerald-500/30",
                    acc.type === "OTHER" && "bg-amber-500/30"
                  )}
                />

                {/* Top smart-card accent gradient line */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2",
                    acc.type === "BANK" && "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400",
                    acc.type === "E_WALLET" && "bg-gradient-to-r from-[#FF6B5B] via-pink-500 to-purple-600",
                    acc.type === "CASH" && "bg-gradient-to-r from-[#0D9488] via-emerald-500 to-teal-400",
                    acc.type === "OTHER" && "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400"
                  )}
                />

                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#14213D]/8 text-[#14213D] dark:bg-[#1E2D4A] dark:text-[#FF6B5B] border border-border/50 transition-transform duration-300 group-hover:scale-110 shadow-xs">
                      {getAccountIcon(acc.type)}
                    </div>
                    <div>
                      <CardTitle className="text-base font-extrabold text-foreground group-hover:text-[#FF6B5B] transition-colors">
                        {acc.name}
                      </CardTitle>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4EDE4] text-[#14213D] dark:bg-[#1E2D4A] dark:text-[#FAF7F2] uppercase tracking-wider mt-1 border border-border/50">
                        {getAccountBadge(acc.type)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer rounded-lg hover:bg-[#F4EDE4] dark:hover:bg-[#1E2D4A]"
                      onClick={() => {
                        setAccountToEdit(acc);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-[#FF6B5B] cursor-pointer rounded-lg hover:bg-[#FF6B5B]/10"
                      onClick={() => setAccountToDelete(acc)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Hapus</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 relative z-10">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Saldo Saat Ini</p>
                    <p className="text-2xl font-extrabold font-mono tracking-tight text-foreground tabular-nums">
                      {formatIDR(currentBal)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">Saldo Awal</span>
                    <span className="font-mono font-semibold tabular-nums text-foreground">{formatIDR(acc.initialBalance)}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialog Form Akun */}
      <AccountDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setAccountToEdit(null);
        }}
        accountToEdit={accountToEdit}
        onSave={handleSaveAccount}
      />

      {/* Dialog Konfirmasi Hapus */}
      <ConfirmDialog
        open={Boolean(accountToDelete)}
        onOpenChange={(open) => {
          if (!open) setAccountToDelete(null);
        }}
        title="Hapus Akun Keuangan"
        description={`Apakah Anda yakin ingin menghapus akun "${accountToDelete?.name}"? Transaksi yang berkaitan dengan akun ini akan ikut terdampak.`}
        confirmLabel={isDeleting ? "Menghapus..." : "Ya, Hapus"}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
