import { format } from "date-fns";
import { id } from "date-fns/locale";

export { cn } from "cn";

/**
 * Format a numeric amount to Indonesian Rupiah (IDR).
 * Example: formatIDR(1500000) => "Rp 1.500.000"
 */
export function formatIDR(
  amount: number,
  options?: {
    showSign?: boolean;
    type?: "INCOME" | "EXPENSE";
  }
): string {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(absAmount)
    .replace("Rp", "Rp ");

  if (options?.showSign || options?.type) {
    if (options.type === "INCOME" || amount > 0) {
      return `+ ${formatted}`;
    }
    if (options.type === "EXPENSE" || amount < 0) {
      return `- ${formatted}`;
    }
  }

  return formatted;
}

/**
 * Format date string to Indonesian readable format.
 * Example: formatDate("2026-11-03") => "3 Nov 2026"
 */
export function formatDate(dateString: string, formatStr = "dd MMM yyyy"): string {
  try {
    return format(new Date(dateString), formatStr, { locale: id });
  } catch {
    return dateString;
  }
}
