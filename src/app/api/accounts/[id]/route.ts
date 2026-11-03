import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { AccountService } from "@/services/account.service";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  type: z.enum(["CASH", "BANK", "E_WALLET", "OTHER"]).optional(),
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
            message: "Data pembaruan akun tidak valid",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = await AccountService.updateAccount(id, user.id, result.data);
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
    await AccountService.deleteAccount(id, user.id);
    return NextResponse.json({
      success: true,
      message: "Akun keuangan berhasil dihapus",
    });
  } catch (error: unknown) {
    return formatErrorResponse("DELETE_ERROR", error, 400);
  }
}
