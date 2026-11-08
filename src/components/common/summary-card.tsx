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
        "group premium-card relative overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1",
        variant === "expense" && "hover:border-[#FF6B5B]/40 dark:hover:border-[#FF6B5B]/50",
        variant === "income" && "hover:border-[#0D9488]/40 dark:hover:border-[#2DD4BF]/50",
        variant === "default" && "hover:border-[#14213D]/40 dark:hover:border-[#FF6B5B]/40",
        className
      )}
    >
      {/* Decorative ambient radial corner glow */}
      <div
        className={cn(
          "pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-75",
          variant === "default" && "bg-[#14213D]/25 dark:bg-[#FF6B5B]/20",
          variant === "income" && "bg-[#0D9488]/30 dark:bg-[#2DD4BF]/25",
          variant === "expense" && "bg-[#FF6B5B]/30 dark:bg-[#FF6B5B]/30",
          variant === "warning" && "bg-[#D97706]/30 dark:bg-[#FBBF24]/25"
        )}
      />

      {/* Subtle top accent gradient line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2",
          variant === "default" && "bg-gradient-to-r from-[#14213D] via-[#1E2D4A] to-[#FF6B5B] dark:from-[#FF6B5B] dark:to-[#FFA07A]",
          variant === "income" && "bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#2DD4BF]",
          variant === "expense" && "bg-gradient-to-r from-[#FF6B5B] via-[#FF8577] to-[#FFA07A]",
          variant === "warning" && "bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FBBF24]"
        )}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 space-y-0 relative z-10">
        <CardTitle className="text-xs sm:text-[13px] font-bold tracking-wider text-muted-foreground uppercase">
          {title}
        </CardTitle>
        {icon && (
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs",
              variant === "default" && "bg-[#14213D]/10 text-[#14213D] dark:bg-[#1E2D4A] dark:text-[#FAF7F2] group-hover:bg-[#14213D] group-hover:text-white dark:group-hover:bg-[#FF6B5B]",
              variant === "income" && "bg-[#0D9488]/12 text-[#0D9488] dark:bg-[#0D9488]/20 dark:text-[#2DD4BF] group-hover:bg-[#0D9488] group-hover:text-white",
              variant === "expense" && "bg-[#FF6B5B]/12 text-[#FF6B5B] dark:bg-[#FF6B5B]/20 dark:text-[#FF6B5B] group-hover:bg-[#FF6B5B] group-hover:text-white",
              variant === "warning" && "bg-[#D97706]/12 text-[#D97706] dark:bg-[#D97706]/20 dark:text-[#FBBF24] group-hover:bg-[#D97706] group-hover:text-white"
            )}
          >
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-5 relative z-10">
        <div className="text-2xl sm:text-[28px] font-extrabold font-mono tracking-tight text-foreground tabular-nums">
          {value}
        </div>
        {(description || trend) && (
          <div className="flex items-center gap-2 mt-2.5 text-xs text-muted-foreground">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[11px] border shadow-xs transition-colors",
                  trend.isPositive
                    ? "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20 dark:bg-[#0D9488]/20 dark:text-[#2DD4BF] dark:border-[#2DD4BF]/30"
                    : "bg-[#FF6B5B]/10 text-[#FF6B5B] border-[#FF6B5B]/20 dark:bg-[#FF6B5B]/20 dark:text-[#FF6B5B] dark:border-[#FF6B5B]/30"
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
