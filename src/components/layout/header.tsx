"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Plus, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileNavigation } from "./mobile-nav";

export function Header() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Pengguna MoneyTrack";
  const userEmail = session?.user?.email || "user@moneytrack.local";
  const userInitials = (session?.user?.name || "MT")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <MobileNavigation />
        <div className="hidden sm:flex flex-col">
          <span className="text-xs text-muted-foreground">Selamat Datang,</span>
          <span className="text-sm font-semibold text-foreground">{userName}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/transactions">
          <Button size="sm" className="gap-1.5 shadow-xs">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Catat Transaksi</span>
            <span className="sm:hidden">Transaksi</span>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full h-9 w-9 border border-border inline-flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Pengaturan Profil</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Keluar (Logout)</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
