import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  variant?: "default" | "income" | "expense" | "warning";
  className?: string;
}

export function SummaryCard({
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
  className,
}: SummaryCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div
            className={cn(
              "p-2 rounded-lg text-foreground",
              variant === "default" && "bg-muted text-muted-foreground",
              variant === "income" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
              variant === "expense" && "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400",
              variant === "warning" && "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
            )}
          >
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono tracking-tight tabular-nums">
          {value}
        </div>
        {(description || trend) && (
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            {trend && (
              <span
                className={cn(
                  "font-medium",
                  trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {trend.value}
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

