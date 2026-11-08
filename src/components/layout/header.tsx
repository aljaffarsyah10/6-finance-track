"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Plus, User, LogOut, ShieldCheck } from "lucide-react";
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
import { ThemeToggle } from "@/components/common/theme-toggle";
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
    <header className="h-16 border-b border-border/80 bg-background/80 dark:bg-[#0B111E]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 transition-colors">
      <div className="flex items-center gap-3">
        <MobileNavigation />
        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488]" />
            <span>Multi-Tenant Vault</span>
          </div>
          <span className="text-sm font-bold text-foreground tracking-tight">
            {userName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <Link href="/transactions">
          <Button
            size="sm"
            className="gap-2 bg-[#14213D] hover:bg-[#1C2E54] text-[#FAF7F2] dark:bg-[#FF6B5B] dark:hover:bg-[#FF5542] dark:text-white rounded-xl shadow-xs px-3.5 transition-all duration-150 font-semibold"
          >
            <Plus className="h-4 w-4 text-[#FF6B5B] dark:text-white" />
            <span className="hidden sm:inline">Catat Transaksi</span>
            <span className="sm:hidden">Transaksi</span>
          </Button>
        </Link>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full h-9 w-9 border border-border/80 inline-flex items-center justify-center cursor-pointer hover:bg-[#F4EDE4] dark:hover:bg-[#1E2D4A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#14213D] dark:focus:ring-[#FF6B5B]">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#14213D] text-[#FAF7F2] dark:bg-[#1E2D4A] dark:text-[#FF6B5B] font-bold text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border border-border/80 shadow-lg bg-card">
            <DropdownMenuLabel className="font-normal px-3 py-2.5">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none text-foreground">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings">
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 font-medium">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Pengaturan Profil</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer rounded-lg px-3 py-2 text-[#FF6B5B] focus:text-[#FF6B5B] focus:bg-[#FF6B5B]/10 font-medium"
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
