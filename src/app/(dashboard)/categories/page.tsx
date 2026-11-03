import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Tag, ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Kategori Transaksi"
        description="Kelompokkan pos pengeluaran dan sumber pemasukan Anda."
      >
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Kategori
        </Button>
      </PageHeader>

      <Tabs defaultValue="expense" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="expense" className="gap-2">
            <ArrowDownRight className="h-4 w-4 text-red-500" />
            Pengeluaran
          </TabsTrigger>
          <TabsTrigger value="income" className="gap-2">
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            Pemasukan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expense" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <EmptyState
                title="Kategori Pengeluaran"
                description="Kelola kategori seperti Makanan, Transportasi, Tempat Tinggal, Tagihan, dan Hiburan."
                icon={<Tag className="h-6 w-6" />}
                action={
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Kategori Pengeluaran
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <EmptyState
                title="Kategori Pemasukan"
                description="Kelola kategori seperti Gaji, Bonus, Freelance, dan Investasi."
                icon={<Tag className="h-6 w-6" />}
                action={
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Kategori Pemasukan
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

