import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { TransactionService } from "@/services/transaction.service";
import { z } from "zod";

const updateSchema = z.object({
  accountId: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  amount: z.number().int().positive().optional(),
  transactionDate: z.string().min(1).optional(),
  description: z.string().max(500).optional(),
});

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  const { id } = await context.params;

  try {
    const data = await TransactionService.getTransactionById(id, user.id);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return formatErrorResponse("NOT_FOUND", error, 404);
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  const { id } = await context.params;

  try {
    const body = await req.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data pembaruan transaksi tidak valid",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = await TransactionService.updateTransaction(id, user.id, result.data);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return formatErrorResponse("UPDATE_ERROR", error, 400);
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  const { id } = await context.params;

  try {
    await TransactionService.deleteTransaction(id, user.id);
    return NextResponse.json({
      success: true,
      message: "Transaksi berhasil dihapus",
    });
  } catch (error: unknown) {
    return formatErrorResponse("DELETE_ERROR", error, 400);
  }
}
