import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SummaryCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-36 mb-2" />
        <Skeleton className="h-3 w-48" />
      </CardContent>
    </Card>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-3">
      <Skeleton className="h-10 w-full rounded-lg" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  );
}

export interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  variant?: "text" | "button" | "card" | "table-row" | "custom";
}

export function LoadingSkeleton({
  className,
  count = 1,
  variant,
}: LoadingSkeletonProps) {
  const getDefaultClass = () => {
    switch (variant) {
      case "text":
        return "h-4 w-3/4 rounded";
      case "button":
        return "h-9 w-28 rounded-lg";
      case "card":
        return "h-32 w-full rounded-xl";
      case "table-row":
        return "h-12 w-full rounded-lg";
      default:
        return "h-20 w-full rounded-xl";
    }
  };

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(getDefaultClass(), className)}
        />
      ))}
    </div>
  );
}
