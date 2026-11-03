"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { SummaryCard } from "@/components/common/summary-card";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wallet, Landmark, Smartphone, Edit2, Trash2 } from "lucide-react";
import { mockAccounts } from "@/features/accounts/mocks/accounts.mock";
import { AccountDialog } from "@/features/accounts/components/account-dialog";
import { AccountFormValues } from "@/lib/validations/account.schema";
import { formatIDR } from "@/lib/utils";
import { Account } from "@/types";
import { toast } from "sonner";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

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

  const handleSaveAccount = (data: AccountFormValues, id?: string) => {
    if (id) {
      // Edit
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === id
            ? {
                ...acc,
                name: data.name,
                type: data.type,
              }
            : acc
        )
      );
    } else {
      // Create
      const newAcc: Account = {
        id: `acc_${Date.now()}`,
        userId: "user_demo",
        name: data.name,
        type: data.type,
        initialBalance: data.initialBalance,
        currentBalance: data.initialBalance,
        createdAt: new Date().toISOString(),
      };
      setAccounts((prev) => [...prev, newAcc]);
    }
  };

  const handleDelete = () => {
    if (!accountToDelete) return;
    setAccounts((prev) => prev.filter((acc) => acc.id !== accountToDelete.id));
    toast.success("Akun keuangan berhasil dihapus");
    setAccountToDelete(null);
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

      {/* Global Balance Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Saldo Terkonsolidasi"
          value={formatIDR(totalBalance)}
          description={`${accounts.length} Akun Aktif`}
          icon={<Wallet className="h-5 w-5" />}
          variant="default"
        />
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => {
          const balance = acc.currentBalance ?? acc.initialBalance;
          return (
            <Card key={acc.id} className="relative overflow-hidden group hover:border-primary/40 transition-colors">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-muted shrink-0">
                    {getAccountIcon(acc.type)}
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold leading-tight">
                      {acc.name}
                    </CardTitle>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground mt-1">
                      {getAccountBadge(acc.type)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
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
                    <span className="sr-only">Edit Akun</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-red-600"
                    onClick={() => setAccountToDelete(acc)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Hapus Akun</span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-4 border-t border-border mt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Saldo Saat Ini</span>
                  <span className="text-2xl font-bold font-mono tracking-tight text-foreground tabular-nums mt-0.5">
                    {formatIDR(balance)}
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-1">
                    Saldo awal: {formatIDR(acc.initialBalance)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AccountDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        accountToEdit={accountToEdit}
        onSave={handleSaveAccount}
      />

      <ConfirmDialog
        open={Boolean(accountToDelete)}
        onOpenChange={(open) => !open && setAccountToDelete(null)}
        title="Hapus Akun Keuangan"
        description={`Apakah Anda yakin ingin menghapus akun "${accountToDelete?.name}"? Transaksi yang terhubung ke akun ini dapat terpengaruh.`}
        confirmLabel="Hapus Akun"
        onConfirm={handleDelete}
      />
    </div>
  );
}
