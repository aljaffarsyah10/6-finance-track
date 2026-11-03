"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`h-9 w-9 text-muted-foreground ${className}`}
        aria-label="Toggle tema gelap atau terang"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-9 w-9 text-muted-foreground hover:text-foreground cursor-pointer ${className}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Beralih ke tema terang" : "Beralih ke tema gelap"}
      title={isDark ? "Beralih ke tema terang" : "Beralih ke tema gelap"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 transition-transform rotate-0" />
      )}
      <span className="sr-only">Toggle tema</span>
    </Button>
  );
}
