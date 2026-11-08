"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Tag,
  Target,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transaksi", href: "/transactions", icon: ArrowLeftRight },
  { name: "Akun Keuangan", href: "/accounts", icon: Wallet },
  { name: "Kategori", href: "/categories", icon: Tag },
  { name: "Anggaran", href: "/budgets", icon: Target },
  { name: "Laporan", href: "/reports", icon: BarChart3 },
];

export const secondaryItems = [
  { name: "Pengaturan", href: "/settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-64 border-r border-border/80 bg-gradient-to-b from-card via-[#FAF7F2] to-[#F3EDE4] dark:from-[#0E1626] dark:via-[#111A2E] dark:to-[#0A101D] text-card-foreground h-screen transition-colors shadow-lg shadow-black/5 z-40",
        className
      )}
    >
      {/* Brand Header with subtle gradient */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-border/80 bg-gradient-to-r from-card/90 via-card/80 to-card/90 backdrop-blur-md">
        <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-[#14213D] via-[#1E2D4A] to-[#14213D] dark:from-[#1E2D4A] dark:to-[#0F172A] text-[#FAF7F2] flex items-center justify-center font-bold shadow-md border border-white/20 group">
          <Wallet className="h-5 w-5 text-[#FF6B5B] transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#FF6B5B] ring-2 ring-card animate-pulse-glow" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-gradient-navy">
              MoneyTrack
            </span>
            <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-gradient-to-r from-[#FF6B5B]/20 to-[#FFA07A]/20 text-[#FF6B5B] uppercase tracking-wider border border-[#FF6B5B]/30 shadow-xs">
              PRO
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground tracking-wide font-medium">
            Financial Management
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Menu Utama
          </div>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-[#14213D] via-[#1E2D4A] to-[#14213D] text-[#FAF7F2] dark:from-[#FF6B5B] dark:to-[#FF5542] dark:text-white shadow-md font-semibold translate-x-1 border border-white/10 dark:border-white/20"
                      : "text-muted-foreground hover:bg-[#F4EDE4] hover:text-[#14213D] dark:hover:bg-[#1A2844] dark:hover:text-[#FAF7F2] hover:translate-x-0.5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3",
                        isActive
                          ? "text-[#FF6B5B] dark:text-white"
                          : "text-muted-foreground group-hover:text-[#14213D] dark:group-hover:text-[#FAF7F2]"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#FF6B5B] dark:bg-white shadow-xs animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Preferensi
          </div>
          <nav className="space-y-1">
            {secondaryItems.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-[#14213D] via-[#1E2D4A] to-[#14213D] text-[#FAF7F2] dark:from-[#FF6B5B] dark:to-[#FF5542] dark:text-white shadow-md font-semibold translate-x-1 border border-white/10 dark:border-white/20"
                      : "text-muted-foreground hover:bg-[#F4EDE4] hover:text-[#14213D] dark:hover:bg-[#1A2844] dark:hover:text-[#FAF7F2] hover:translate-x-0.5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3",
                        isActive
                          ? "text-[#FF6B5B] dark:text-white"
                          : "text-muted-foreground group-hover:text-[#14213D] dark:group-hover:text-[#FAF7F2]"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#FF6B5B] dark:bg-white shadow-xs animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Financial Health Mini Banner */}
      <div className="px-4 py-2">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#F4EDE4] to-card dark:from-[#1E2D4A] dark:to-[#14213D] border border-border/80 shadow-xs flex items-start gap-2.5 relative overflow-hidden">
          <div className="p-1.5 rounded-lg bg-[#FF6B5B]/15 text-[#FF6B5B] shrink-0 mt-0.5">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          </div>
          <div className="text-[11px] leading-tight">
            <span className="font-extrabold text-foreground block mb-0.5">
              Precision Core
            </span>
            <span className="text-muted-foreground">
              Aritmatika integer Rupiah 100% bebas dari pembulatan floating-point error.
            </span>
          </div>
        </div>
      </div>

      {/* Logout & Footer with subtle gradient */}
      <div className="p-4 border-t border-border/80 bg-gradient-to-r from-card/90 via-card/80 to-card/90 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#FF6B5B] hover:bg-gradient-to-r hover:from-[#FF6B5B]/15 hover:to-[#FF6B5B]/5 transition-all duration-200 cursor-pointer text-left"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="font-semibold">Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
}
