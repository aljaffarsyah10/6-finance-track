import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { CategoryService } from "@/services/category.service";
import { categorySchema } from "@/lib/validations/category.schema";
import { TransactionType } from "@prisma/client";

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  const searchParams = req.nextUrl.searchParams;
  const typeParam = searchParams.get("type");
  const type =
    typeParam === "INCOME" || typeParam === "EXPENSE"
      ? (typeParam as TransactionType)
      : undefined;

  try {
    const data = await CategoryService.getCategories(user.id, type);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 500);
  }
}

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  try {
    const body = await req.json();
    const result = categorySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data kategori tidak valid",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = await CategoryService.createCategory(user.id, result.data);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 500);
  }
}
