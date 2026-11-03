import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">Masuk ke Akun</CardTitle>
        <CardDescription>
          Masukkan email dan kata sandi Anda untuk mengakses dashboard keuangan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Kata Sandi</Label>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Link href="/dashboard" className="block w-full pt-2">
          <Button className="w-full gap-2">
            <LogIn className="h-4 w-4" />
            Masuk
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-center text-xs text-muted-foreground border-t border-border pt-4">
        <div>
          Belum memiliki akun MoneyTrack?{" "}
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline"
          >
            Daftar Sekarang
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

