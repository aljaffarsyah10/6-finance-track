"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfileSettingsPage() {
  const { data: session } = useSession();
  const [customName, setCustomName] = useState<string | null>(null);

  const displayedName = customName !== null ? customName : session?.user?.name || "";

  const handleSave = () => {
    toast.success("Informasi profil berhasil disimpan.");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="mb-2">
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pengaturan
        </Link>
      </div>

      <PageHeader
        title="Profil Pengguna"
        description="Informasi personal dan kredensial akun MoneyTrack Anda."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Data Pribadi</CardTitle>
          <CardDescription>
            Nama ini digunakan untuk menyapa Anda di dalam dashboard aplikasi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              value={displayedName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Nama Lengkap Anda"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input
              id="email"
              type="email"
              value={session?.user?.email || "user@moneytrack.local"}
              disabled
            />
            <p className="text-[11px] text-muted-foreground">
              Email digunakan sebagai identitas login utama dan tidak dapat diubah sembarangan.
            </p>
          </div>
          <div className="pt-2">
            <Button size="sm" className="gap-2" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
