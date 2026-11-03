import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse, formatErrorResponse } from "@/lib/api-session";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/validations/user.schema";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.id) {
      return unauthorizedResponse();
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!userData) {
      return formatErrorResponse("USER_NOT_FOUND", "Pengguna tidak ditemukan", 404);
    }

    return NextResponse.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    return formatErrorResponse("GET_PROFILE_FAILED", error, 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.id) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return formatErrorResponse("VALIDATION_ERROR", parsed.error.issues[0].message, 400);
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { name: parsed.data.name.trim() },
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return formatErrorResponse("UPDATE_PROFILE_FAILED", error, 500);
  }
}
