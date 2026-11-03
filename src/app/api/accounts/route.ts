import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  unauthorizedResponse,
  formatErrorResponse,
} from "@/lib/api-session";
import { AccountService } from "@/services/account.service";
import { accountSchema } from "@/lib/validations/account.schema";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user?.id) return unauthorizedResponse();

  try {
    const data = await AccountService.getAccountsWithBalances(user.id);
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
    const result = accountSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data akun tidak valid",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = await AccountService.createAccount(user.id, result.data);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: unknown) {
    return formatErrorResponse("SERVER_ERROR", error, 500);
  }
}
