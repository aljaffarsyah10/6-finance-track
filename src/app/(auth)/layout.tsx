import React from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/40">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">
              MoneyTrack
            </span>
          </Link>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
            Personal Finance Management
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

