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
import { formatIDR } from "@/lib/utils";
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
          setAccounts(data);
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

  const totalBalance = accounts.reduce(
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
          description={`Akumulasi saldo dari ${accounts.length} akun aktif`}
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
      ) : accounts.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => {
            const currentBal = acc.currentBalance ?? acc.initialBalance;
            return (
              <Card key={acc.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-muted border border-border">
                      {getAccountIcon(acc.type)}
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">
                        {acc.name}
                      </CardTitle>
                      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        {getAccountBadge(acc.type)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                      className="h-8 w-8 text-muted-foreground hover:text-red-600"
                      onClick={() => setAccountToDelete(acc)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Hapus</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Saldo Saat Ini</p>
                    <p className="text-xl font-bold font-mono tracking-tight text-foreground">
                      {formatIDR(currentBal)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Saldo Awal</span>
                    <span className="font-mono tabular-nums">{formatIDR(acc.initialBalance)}</span>
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
