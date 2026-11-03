import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { DashboardService } from "@/services/dashboard.service";

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  const searchParams = req.nextUrl.searchParams;
  const month = searchParams.get("month") ? parseInt(searchParams.get("month")!, 10) : undefined;
  const year = searchParams.get("year") ? parseInt(searchParams.get("year")!, 10) : undefined;

  try {
    const data = await DashboardService.getExpenseBreakdown(user.id, month, year);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 500);
  }
}
