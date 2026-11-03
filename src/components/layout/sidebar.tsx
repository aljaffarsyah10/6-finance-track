"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Tag,
  Target,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transaksi", href: "/transactions", icon: ArrowLeftRight },
  { name: "Akun Keuangan", href: "/accounts", icon: Wallet },
  { name: "Kategori", href: "/categories", icon: Tag },
  { name: "Anggaran", href: "/budgets", icon: Target },
  { name: "Laporan", href: "/reports", icon: BarChart3 },
  { name: "Pengaturan", href: "/settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col w-64 border-r border-border bg-card text-card-foreground h-screen sticky top-0",
        className
      )}
    >
      <div className="h-16 flex items-center gap-3 px-6 border-b border-border">
        <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
          <Wallet className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight">MoneyTrack</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
            Personal Finance
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Keluar</span>
        </Link>
      </div>
    </aside>
  );
}

