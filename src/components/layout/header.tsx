"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Plus, User, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
    <header className="h-16 border-b border-border/80 bg-gradient-to-r from-card/95 via-background/90 to-card/95 dark:from-[#0E1626]/95 dark:via-[#14213D]/90 dark:to-[#0B111E]/95 glass-nav sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 transition-all duration-200 shadow-sm relative">
      {/* Subtle bottom gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF6B5B]/40 to-transparent pointer-events-none" />

      <div className="flex items-center gap-3">
        <MobileNavigation />
        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#0D9488]/15 via-[#2DD4BF]/20 to-[#0D9488]/15 text-[#0D9488] dark:text-[#2DD4BF] border border-[#0D9488]/30 shadow-xs text-[11px] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse" />
              Multi-Tenant Vault
            </span>
          </div>
          <span className="text-sm font-extrabold text-gradient-navy tracking-tight mt-0.5">
            {userName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <Link href="/transactions">
          <Button
            size="sm"
            className="gap-2 bg-gradient-to-r from-[#FF6B5B] via-[#FF5542] to-[#FF7A6B] text-white font-bold rounded-xl shadow-md shadow-[#FF6B5B]/25 hover:shadow-lg hover:shadow-[#FF6B5B]/40 hover:scale-[1.02] active:scale-[0.98] px-4 transition-all duration-200 border border-white/20"
          >
            <Plus className="h-4 w-4 text-white" />
            <span className="hidden sm:inline">Catat Transaksi</span>
            <span className="sm:hidden">Transaksi</span>
          </Button>
        </Link>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full h-9 w-9 border border-border/80 inline-flex items-center justify-center cursor-pointer hover:border-[#FF6B5B]/50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B5B]">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-[#14213D] via-[#1E2D4A] to-[#14213D] text-[#FAF7F2] dark:from-[#FF6B5B] dark:to-[#FF5542] dark:text-white font-bold text-xs shadow-xs border border-white/20">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border border-border/80 shadow-lg bg-card">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal px-3 py-2.5">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none text-foreground">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
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
