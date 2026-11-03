import { NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { DashboardService } from "@/services/dashboard.service";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  try {
    const data = await DashboardService.getSummary(user.id);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 500);
  }
}
