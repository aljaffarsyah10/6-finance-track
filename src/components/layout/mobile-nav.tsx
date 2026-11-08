"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, Wallet, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems, secondaryItems } from "./sidebar";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-xl h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-[#F4EDE4] dark:hover:bg-[#1E2D4A] transition-colors cursor-pointer border border-border/60">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Buka menu navigasi</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 flex flex-col h-full bg-card">
        <SheetHeader className="h-16 flex flex-row items-center gap-3 px-5 border-b border-border">
          <div className="relative h-9 w-9 rounded-xl bg-[#14213D] dark:bg-[#1E2D4A] text-[#FAF7F2] flex items-center justify-center font-bold shadow-xs">
            <Wallet className="h-4.5 w-4.5 text-[#FF6B5B]" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#FF6B5B] ring-2 ring-card" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <SheetTitle className="font-extrabold text-base tracking-tight leading-none text-[#14213D] dark:text-[#FAF7F2]">
                MoneyTrack
              </SheetTitle>
              <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-[#FF6B5B]/15 text-[#FF6B5B] uppercase tracking-wider">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground tracking-wide font-medium mt-1">
              Financial Management
            </span>
          </div>
        </SheetHeader>

        <div className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
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
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-[#14213D] text-[#FAF7F2] dark:bg-[#FF6B5B] dark:text-white font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-[#F4EDE4] hover:text-[#14213D] dark:hover:bg-[#1A2844] dark:hover:text-[#FAF7F2]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive
                            ? "text-[#FF6B5B] dark:text-white"
                            : "text-muted-foreground"
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
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-[#14213D] text-[#FAF7F2] dark:bg-[#FF6B5B] dark:text-white font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-[#F4EDE4] hover:text-[#14213D] dark:hover:bg-[#1A2844] dark:hover:text-[#FAF7F2]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive
                            ? "text-[#FF6B5B] dark:text-white"
                            : "text-muted-foreground"
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

        <div className="p-4 border-t border-border mt-auto">
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/login" });
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#FF6B5B] hover:bg-[#FF6B5B]/10 dark:hover:bg-[#FF6B5B]/20 transition-colors cursor-pointer text-left"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="font-semibold">Keluar (Logout)</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
