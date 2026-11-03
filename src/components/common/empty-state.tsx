import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-border bg-card/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
        {icon || <FolderOpen className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground mb-5">
        {description}
      </p>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

