import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { BudgetService } from "@/services/budget.service";
import { budgetSchema } from "@/lib/validations/budget.schema";

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  const searchParams = req.nextUrl.searchParams;
  const now = new Date();
  const month = parseInt(searchParams.get("month") || `${now.getMonth() + 1}`, 10);
  const year = parseInt(searchParams.get("year") || `${now.getFullYear()}`, 10);

  try {
    const data = await BudgetService.getBudgetsWithProgress(user.id, month, year);
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
    const result = budgetSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data anggaran tidak valid",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = await BudgetService.createBudget(user.id, result.data);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: unknown) {
    return formatErrorResponse("BUDGET_ERROR", error, 400);
  }
}
