import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-border/80 bg-card/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#14213D]/8 dark:bg-[#1E2D4A] text-[#14213D] dark:text-[#FF6B5B] mb-4">
        {icon || <FolderOpen className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm font-medium text-muted-foreground mb-5">
        {description}
      </p>
      {action ? (
        <div className="flex items-center gap-2">{action}</div>
      ) : actionLabel && onAction ? (
        <Button
          size="sm"
          className="rounded-xl bg-[#14213D] text-[#FAF7F2] hover:bg-[#1E2D4A] dark:bg-[#FF6B5B] dark:text-white font-bold h-9 px-4 shadow-xs"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
