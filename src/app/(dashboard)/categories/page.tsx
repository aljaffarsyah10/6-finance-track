"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Tag, ArrowDownRight, ArrowUpRight, Edit2, Trash2 } from "lucide-react";
import { mockCategories } from "@/features/categories/mocks/categories.mock";
import { CategoryDialog } from "@/features/categories/components/category-dialog";
import { CategoryFormValues } from "@/lib/validations/category.schema";
import { Category } from "@/types";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [activeTab, setActiveTab] = useState<"EXPENSE" | "INCOME">("EXPENSE");

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const expenseCategories = categories.filter((c) => c.type === "EXPENSE");
  const incomeCategories = categories.filter((c) => c.type === "INCOME");

  const handleSaveCategory = (data: CategoryFormValues, id?: string) => {
    if (id) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                name: data.name,
                color: data.color || "#888",
              }
            : c
        )
      );
    } else {
      const newCat: Category = {
        id: `cat_${Date.now()}`,
        userId: "user_demo",
        name: data.name,
        type: data.type,
        color: data.color || "#888",
        createdAt: new Date().toISOString(),
      };
      setCategories((prev) => [...prev, newCat]);
    }
  };

  const handleDelete = () => {
    if (!categoryToDelete) return;
    setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
    toast.success("Kategori berhasil dihapus");
    setCategoryToDelete(null);
  };

  const renderCategoryList = (list: Category[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((cat) => (
          <Card key={cat.id} className="group hover:border-primary/40 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                  style={{
                    backgroundColor: `${cat.color || "#10b981"}20`,
                    color: cat.color || "#10b981",
                  }}
                >
                  <Tag className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{cat.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {cat.type === "EXPENSE" ? "Pos Pengeluaran" : "Pos Pemasukan"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100">
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-red-600"
                  onClick={() => setCategoryToDelete(cat)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="sr-only">Hapus</span>
                </Button>
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

        <TabsContent value="EXPENSE" className="mt-6">
          {renderCategoryList(expenseCategories)}
        </TabsContent>

        <TabsContent value="INCOME" className="mt-6">
          {renderCategoryList(incomeCategories)}
        </TabsContent>
      </Tabs>

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        defaultType={activeTab}
        categoryToEdit={categoryToEdit}
        onSave={handleSaveCategory}
      />

      <ConfirmDialog
        open={Boolean(categoryToDelete)}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        title="Hapus Kategori"
        description={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"?`}
        confirmLabel="Hapus Kategori"
        onConfirm={handleDelete}
      />
    </div>
  );
}
