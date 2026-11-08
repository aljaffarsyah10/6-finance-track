import React from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative selection:bg-[#FF6B5B]/20">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-2 group">
            <div className="relative h-11 w-11 rounded-xl bg-[#14213D] dark:bg-[#1E2D4A] text-[#FAF7F2] flex items-center justify-center font-bold shadow-xs border border-border/60 transition-transform group-hover:scale-105">
              <Wallet className="h-5 w-5 text-[#FF6B5B]" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#FF6B5B] ring-2 ring-background" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-[#14213D] dark:text-[#FAF7F2]">
                MoneyTrack
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-[#FF6B5B]/15 text-[#FF6B5B] uppercase tracking-wider">
                PRO
              </span>
            </div>
          </Link>
          <p className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
            Personal Finance Management
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
