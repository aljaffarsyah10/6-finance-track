"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Wallet, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems } from "./sidebar";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Buka menu navigasi</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 flex flex-col h-full">
        <SheetHeader className="h-16 flex flex-row items-center gap-3 px-6 border-b border-border">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
            <Wallet className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <SheetTitle className="font-bold text-base tracking-tight leading-none">
              MoneyTrack
            </SheetTitle>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mt-1">
              Personal Finance
            </span>
          </div>
        </SheetHeader>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
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
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Keluar</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
