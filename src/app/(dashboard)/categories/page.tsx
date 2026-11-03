"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { ErrorState } from "@/components/common/error-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Tag, ArrowDownRight, ArrowUpRight, Edit2, Trash2, ShieldCheck } from "lucide-react";
import { categoriesApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import { CategoryDialog } from "@/features/categories/components/category-dialog";
import { CategoryFormValues } from "@/lib/validations/category.schema";
import { Category } from "@/types";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<"EXPENSE" | "INCOME">("EXPENSE");

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadCategories() {
      try {
        const data = await categoriesApi.fetchCategories();
        if (!ignore) {
          setCategories(data);
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

    loadCategories();

    return () => {
      ignore = true;
    };
  }, [refreshTrigger]);

  const expenseCategories = categories.filter((c) => c.type === "EXPENSE");
  const incomeCategories = categories.filter((c) => c.type === "INCOME");

  const handleSaveCategory = async (data: CategoryFormValues, id?: string) => {
    try {
      if (id) {
        await categoriesApi.updateCategory(id, data);
        toast.success("Kategori berhasil diperbarui.");
      } else {
        await categoriesApi.createCategory(data);
        toast.success("Kategori baru berhasil dibuat.");
      }
      setIsDialogOpen(false);
      setCategoryToEdit(null);
      setLoading(true);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      await categoriesApi.deleteCategory(categoryToDelete.id);
      toast.success("Kategori berhasil dihapus.");
      setCategoryToDelete(null);
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

  const renderCategoryList = (list: Category[], type: "EXPENSE" | "INCOME") => {
    if (list.length === 0) {
      return (
        <EmptyState
          icon={<Tag className="h-10 w-10 text-muted-foreground" />}
          title={`Belum Ada Kategori ${type === "EXPENSE" ? "Pengeluaran" : "Pemasukan"}`}
          description={`Tambahkan kategori pos ${
            type === "EXPENSE" ? "pengeluaran" : "pemasukan"
          } untuk mempermudah pencatatan keuangan Anda.`}
          actionLabel="Tambah Kategori"
          onAction={() => {
            setCategoryToEdit(null);
            setIsDialogOpen(true);
          }}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((cat) => (
          <Card key={cat.id} className="group hover:border-primary/40 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                  style={{
                    backgroundColor: `${cat.color || "#10b981"}20`,
                    color: cat.color || "#10b981",
                  }}
                >
                  <Tag className="h-5 w-5" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-sm text-foreground truncate">{cat.name}</p>
                    {cat.isDefault && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium shrink-0">
                        <ShieldCheck className="h-2.5 w-2.5" />
                        Bawaan
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {cat.type === "EXPENSE" ? "Pos Pengeluaran" : "Pos Pemasukan"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 shrink-0 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setCategoryToEdit(cat);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span className="sr-only">Edit</span>
                </Button>
                {!cat.isDefault && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-red-600"
                    onClick={() => setCategoryToDelete(cat)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Hapus</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kategori Transaksi"
        description="Kelompokkan pos pengeluaran dan sumber pemasukan Anda."
      >
        <Button
          size="sm"
          className="gap-2"
          onClick={() => {
            setCategoryToEdit(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Tambah Kategori
        </Button>
      </PageHeader>

      <Tabs
        defaultValue="EXPENSE"
        onValueChange={(val) => setActiveTab(val as "EXPENSE" | "INCOME")}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="EXPENSE" className="gap-2">
            <ArrowDownRight className="h-4 w-4 text-red-500" />
            Pengeluaran ({expenseCategories.length})
          </TabsTrigger>
          <TabsTrigger value="INCOME" className="gap-2">
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            Pemasukan ({incomeCategories.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <LoadingSkeleton variant="card" className="h-20" />
              <LoadingSkeleton variant="card" className="h-20" />
              <LoadingSkeleton variant="card" className="h-20" />
            </div>
          ) : error ? (
            <ErrorState
              title="Gagal Memuat Kategori"
              description={error}
              onRetry={handleRetry}
            />
          ) : (
            <>
              <TabsContent value="EXPENSE">
                {renderCategoryList(expenseCategories, "EXPENSE")}
              </TabsContent>
              <TabsContent value="INCOME">
                {renderCategoryList(incomeCategories, "INCOME")}
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>

      {/* Dialog Form Kategori */}
      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setCategoryToEdit(null);
        }}
        defaultType={activeTab}
        categoryToEdit={categoryToEdit}
        onSave={handleSaveCategory}
      />

      {/* Dialog Konfirmasi Hapus */}
      <ConfirmDialog
        open={Boolean(categoryToDelete)}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null);
        }}
        title="Hapus Kategori"
        description={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"?`}
        confirmLabel={isDeleting ? "Menghapus..." : "Ya, Hapus"}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
