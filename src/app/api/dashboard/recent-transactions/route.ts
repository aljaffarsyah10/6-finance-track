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
  const limit = Math.max(1, Math.min(20, parseInt(searchParams.get("limit") || "5", 10)));

  try {
    const data = await DashboardService.getRecentTransactions(user.id, limit);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 500);
  }
}
