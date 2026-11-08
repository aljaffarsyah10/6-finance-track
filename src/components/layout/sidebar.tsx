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
        "flex flex-col w-64 border-r border-border bg-card text-card-foreground h-screen sticky top-0 transition-colors",
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-border">
        <div className="relative h-10 w-10 rounded-xl bg-[#14213D] dark:bg-[#1E2D4A] text-[#FAF7F2] flex items-center justify-center font-bold shadow-xs border border-border/50">
          <Wallet className="h-5 w-5 text-[#FF6B5B]" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#FF6B5B] ring-2 ring-card" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-[#14213D] dark:text-[#FAF7F2]">
              MoneyTrack
            </span>
            <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-[#FF6B5B]/15 text-[#FF6B5B] uppercase tracking-wider">
              PRO
            </span>
          </div>
          <span className="text-[10.5px] text-muted-foreground tracking-wide font-medium">
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
                    "group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#14213D] text-[#FAF7F2] dark:bg-[#FF6B5B] dark:text-white shadow-xs font-semibold"
                      : "text-muted-foreground hover:bg-[#F4EDE4] hover:text-[#14213D] dark:hover:bg-[#1A2844] dark:hover:text-[#FAF7F2]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive
                          ? "text-[#FF6B5B] dark:text-white"
                          : "text-muted-foreground group-hover:text-[#14213D] dark:group-hover:text-[#FAF7F2]"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B5B] dark:bg-white" />
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
                    "group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#14213D] text-[#FAF7F2] dark:bg-[#FF6B5B] dark:text-white shadow-xs font-semibold"
                      : "text-muted-foreground hover:bg-[#F4EDE4] hover:text-[#14213D] dark:hover:bg-[#1A2844] dark:hover:text-[#FAF7F2]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive
                          ? "text-[#FF6B5B] dark:text-white"
                          : "text-muted-foreground group-hover:text-[#14213D] dark:group-hover:text-[#FAF7F2]"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B5B] dark:bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Financial Health Mini Banner */}
      <div className="px-4 py-2">
        <div className="p-3.5 rounded-xl bg-[#F4EDE4]/60 dark:bg-[#1A2844]/60 border border-border/80 flex items-start gap-2.5">
          <Sparkles className="h-4 w-4 text-[#FF6B5B] shrink-0 mt-0.5" />
          <div className="text-[11px] leading-tight">
            <span className="font-semibold text-foreground block mb-0.5">
              Precision Finance
            </span>
            <span className="text-muted-foreground">
              Perhitungan presisi integer Rupiah tanpa desimal error.
            </span>
          </div>
        </div>
      </div>

      {/* Logout & Footer */}
      <div className="p-4 border-t border-border mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#FF6B5B] hover:bg-[#FF6B5B]/10 dark:hover:bg-[#FF6B5B]/20 transition-colors cursor-pointer text-left"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="font-semibold">Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
}
