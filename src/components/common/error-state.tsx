import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Terjadi Kesalahan",
  message,
  description,
  onRetry,
}: ErrorStateProps) {
  const content = description || message || "Gagal memuat data. Silakan coba beberapa saat lagi.";

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-[#FF6B5B]/30 bg-[#FF6B5B]/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B5B]/15 text-[#FF6B5B] mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm font-medium text-muted-foreground mb-5">
        {content}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="gap-2 rounded-xl font-bold h-9 px-4">
          <RefreshCw className="h-4 w-4 text-[#FF6B5B]" />
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
