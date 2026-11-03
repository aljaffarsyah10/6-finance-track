import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse, formatErrorResponse } from "@/lib/api-session";
import { TransactionService } from "@/services/transaction.service";
import { TransactionType } from "@prisma/client";

/**
 * Mitigates CSV Formula Injection by prefixing characters that spreadsheet software
 * (Excel, Calc, Google Sheets) interprets as formula triggers with a single quote (').
 */
function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }
  let str = String(value).trim();
  // Check for dangerous formula injection trigger characters
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  // Escape double quotes by doubling them
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.id) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const type = (searchParams.get("type") as TransactionType) || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const search = searchParams.get("search") || undefined;

    const { transactions } = await TransactionService.getTransactions(user.id, {
      accountId,
      categoryId,
      type,
      startDate,
      endDate,
      search,
      take: 10000,
      skip: 0,
    });

    const headers = [
      "Tanggal",
      "Tipe",
      "Kategori",
      "Akun Keuangan",
      "Deskripsi",
      "Nominal (IDR)",
    ];

    interface ExportableTx {
      transactionDate: string | Date;
      type: string;
      description?: string | null;
      amount: number;
      account?: { name: string } | null;
      category?: { name: string } | null;
    }

    const rows = (transactions as unknown as ExportableTx[]).map((tx) => {
      const dateStr = new Date(tx.transactionDate).toISOString().split("T")[0];
      const typeLabel = tx.type === "INCOME" ? "Pemasukan" : "Pengeluaran";
      const categoryName = tx.category?.name || "Tanpa Kategori";
      const accountName = tx.account?.name || "-";
      const description = tx.description || "";
      const amount = tx.amount;

      return [
        sanitizeCsvCell(dateStr),
        sanitizeCsvCell(typeLabel),
        sanitizeCsvCell(categoryName),
        sanitizeCsvCell(accountName),
        sanitizeCsvCell(description),
        sanitizeCsvCell(amount),
      ].join(",");
    });

    // Add UTF-8 BOM so Microsoft Excel opens it seamlessly with proper UTF-8 encoding
    const csvContent = "\uFEFF" + [headers.map(sanitizeCsvCell).join(","), ...rows].join("\r\n");

    const today = new Date().toISOString().split("T")[0];
    const filename = `moneytrack-transaksi-${today}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    return formatErrorResponse("EXPORT_FAILED", error, 500);
  }
}
