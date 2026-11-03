import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  return session.user;
}

export function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Sesi autentikasi tidak valid atau telah berakhir.",
      },
    },
    { status: 401 }
  );
}

export function formatErrorResponse(
  code: string,
  error: unknown,
  status = 400
) {
  const message =
    error instanceof Error ? error.message : "Terjadi kesalahan internal pada server.";
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status }
  );
}
