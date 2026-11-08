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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {accounts.map((acc) => {
            const currentBal = acc.currentBalance ?? acc.initialBalance;
            const isBank = acc.type === "BANK";
            const isWallet = acc.type === "E_WALLET";
            const isCash = acc.type === "CASH";

            return (
              <div
                key={acc.id}
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl card-shine border cursor-default flex flex-col justify-between min-h-[220px]",
                  isBank &&
                    "bg-gradient-to-br from-[#14213D] via-[#1A2C4E] to-[#0A101D] text-white border-white/15 hover:shadow-blue-900/30",
                  isWallet &&
                    "bg-gradient-to-br from-[#2E0854] via-[#541388] to-[#FF6B5B] text-white border-white/15 hover:shadow-purple-900/30",
                  isCash &&
                    "bg-gradient-to-br from-[#042F2C] via-[#064E3B] to-[#0D5E4E] text-white border-white/15 hover:shadow-emerald-900/30",
                  !isBank &&
                    !isWallet &&
                    !isCash &&
                    "bg-gradient-to-br from-[#381604] via-[#78350F] to-[#240E02] text-white border-white/15 hover:shadow-amber-900/30"
                )}
              >
                {/* Dot pattern texture on card */}
                <div className="dot-grid-pattern absolute inset-0 opacity-20 pointer-events-none" />

                {/* Card Top Row: EMV Chip & Account Actions */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Golden Card Chip */}
                    <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#FDE68A] via-[#F59E0B] to-[#B45309] p-0.5 shadow-md border border-amber-200/50 flex flex-col justify-between">
                      <div className="w-full h-0.5 bg-amber-900/30 rounded-xs" />
                      <div className="flex justify-between">
                        <div className="w-3 h-2 border border-amber-900/30 rounded-xs" />
                        <div className="w-3 h-2 border border-amber-900/30 rounded-xs" />
                      </div>
                      <div className="w-full h-0.5 bg-amber-900/30 rounded-xs" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                      {getAccountBadge(acc.type)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md rounded-xl p-1 border border-white/10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 cursor-pointer rounded-lg"
                      onClick={() => {
                        setAccountToEdit(acc);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit2 className="h-3 w-3" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/70 hover:text-[#FF6B5B] hover:bg-[#FF6B5B]/20 cursor-pointer rounded-lg"
                      onClick={() => setAccountToDelete(acc)}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Hapus</span>
                    </Button>
                  </div>
                </div>

                {/* Card Middle: Balance */}
                <div className="relative z-10 my-4 space-y-1">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-white/60">
                    Total Saldo Terkini
                  </p>
                  <p className="text-2xl sm:text-[28px] font-extrabold font-mono tracking-tight text-white tabular-nums drop-shadow-sm">
                    {formatIDR(currentBal)}
                  </p>
                </div>

                {/* Card Bottom: Name & Masked ID */}
                <div className="relative z-10 flex items-end justify-between pt-3 border-t border-white/10">
                  <div className="truncate pr-2">
                    <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Nama Akun
                    </p>
                    <p className="text-sm font-extrabold text-white tracking-wide truncate">
                      {acc.name}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-mono tracking-widest text-white/70">
                      •••• {acc.id.slice(-4).toUpperCase()}
                    </p>
                    <p className="text-[10px] font-mono text-white/50">
                      Awal: {formatIDR(acc.initialBalance)}
                    </p>
                  </div>
                </div>
              </div>
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
