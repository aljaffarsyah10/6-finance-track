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
    <Card
      className={cn(
        "premium-card relative overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-200",
        className
      )}
    >
      {/* Subtle top accent line based on variant */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1",
          variant === "default" && "bg-[#14213D] dark:bg-[#FF6B5B]",
          variant === "income" && "bg-[#0D9488]",
          variant === "expense" && "bg-[#FF6B5B]",
          variant === "warning" && "bg-[#D97706]"
        )}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 space-y-0">
        <CardTitle className="text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          {title}
        </CardTitle>
        {icon && (
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105",
              variant === "default" && "bg-[#14213D]/10 text-[#14213D] dark:bg-[#1E2D4A] dark:text-[#FAF7F2]",
              variant === "income" && "bg-[#0D9488]/12 text-[#0D9488] dark:bg-[#0D9488]/20 dark:text-[#2DD4BF]",
              variant === "expense" && "bg-[#FF6B5B]/12 text-[#FF6B5B] dark:bg-[#FF6B5B]/20 dark:text-[#FF6B5B]",
              variant === "warning" && "bg-[#D97706]/12 text-[#D97706] dark:bg-[#D97706]/20 dark:text-[#FBBF24]"
            )}
          >
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-5">
        <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-foreground tabular-nums">
          {value}
        </div>
        {(description || trend) && (
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center px-1.5 py-0.5 rounded-md font-semibold text-[11px]",
                  trend.isPositive
                    ? "bg-[#0D9488]/12 text-[#0D9488] dark:bg-[#0D9488]/20 dark:text-[#2DD4BF]"
                    : "bg-[#FF6B5B]/12 text-[#FF6B5B] dark:bg-[#FF6B5B]/20 dark:text-[#FF6B5B]"
                )}
              >
                {trend.value}
              </span>
            )}
            {description && <span className="font-medium text-muted-foreground truncate">{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
