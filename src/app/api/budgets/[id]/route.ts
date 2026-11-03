import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { BudgetService } from "@/services/budget.service";
import { z } from "zod";

const updateSchema = z.object({
  amount: z.number().int().positive("Batas anggaran harus lebih dari 0"),
});

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
            message: "Data pembaruan anggaran tidak valid",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = await BudgetService.updateBudget(id, user.id, result.data);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 400);
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
    await BudgetService.deleteBudget(id, user.id);
    return NextResponse.json({
      success: true,
      message: "Anggaran berhasil dihapus",
    });
  } catch (error: unknown) {
    return formatErrorResponse("DELETE_ERROR", error, 400);
  }
}
