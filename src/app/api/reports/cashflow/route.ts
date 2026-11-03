import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { ReportService } from "@/services/report.service";

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  const searchParams = req.nextUrl.searchParams;
  const year = parseInt(searchParams.get("year") || `${new Date().getFullYear()}`, 10);

  try {
    const data = await ReportService.getCashFlowReport(user.id, year);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 500);
  }
}
