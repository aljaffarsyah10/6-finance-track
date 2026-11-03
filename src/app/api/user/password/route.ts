import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse, formatErrorResponse } from "@/lib/api-session";
import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/lib/password";
import { changePasswordSchema } from "@/lib/validations/user.schema";

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.id) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) {
      return formatErrorResponse("VALIDATION_ERROR", parsed.error.issues[0].message, 400);
    }

    const { currentPassword, newPassword } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { passwordHash: true },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return formatErrorResponse("USER_NOT_FOUND", "Pengguna tidak ditemukan", 404);
    }

    const isMatch = await comparePassword(currentPassword, existingUser.passwordHash);
    if (!isMatch) {
      return formatErrorResponse(
        "INVALID_CURRENT_PASSWORD",
        "Kata sandi saat ini yang Anda masukkan salah.",
        400
      );
    }

    const newPasswordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    return NextResponse.json({
      success: true,
      message: "Kata sandi akun Anda berhasil diperbarui.",
    });
  } catch (error) {
    return formatErrorResponse("CHANGE_PASSWORD_FAILED", error, 500);
  }
}
