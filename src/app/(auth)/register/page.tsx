import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">Daftar Akun Baru</CardTitle>
        <CardDescription>
          Mulai kelola keuangan pribadi dengan terencana dan aman.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input id="name" placeholder="Nama Anda" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input id="password" type="password" placeholder="Minimal 8 karakter" />
        </div>
        <Link href="/dashboard" className="block w-full pt-2">
          <Button className="w-full gap-2">
            <UserPlus className="h-4 w-4" />
            Buat Akun
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-center text-xs text-muted-foreground border-t border-border pt-4">
        <div>
          Sudah memiliki akun?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Masuk di Sini
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

