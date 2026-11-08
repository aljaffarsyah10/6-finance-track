import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { TransactionService } from "@/services/transaction.service";
import { transactionSchema } from "@/lib/validations/transaction.schema";
import { TransactionType } from "@prisma/client";

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  const searchParams = req.nextUrl.searchParams;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const accountId = searchParams.get("accountId") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;
  const typeParam = searchParams.get("type");
  const type =
    typeParam === "INCOME" || typeParam === "EXPENSE"
      ? (typeParam as TransactionType)
      : undefined;
  const search = searchParams.get("search") || undefined;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));
  const skip = (page - 1) * limit;

  try {
    const { transactions, total } = await TransactionService.getTransactions(user.id, {
      startDate,
      endDate,
      accountId,
      categoryId,
      type,
      search,
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: transactions,
      transactions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 500);
  }
}

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  try {
    const body = await req.json();
    const result = transactionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data transaksi tidak valid",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = await TransactionService.createTransaction(user.id, result.data);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: unknown) {
    return formatErrorResponse("TRANSACTION_ERROR", error, 400);
  }
}
