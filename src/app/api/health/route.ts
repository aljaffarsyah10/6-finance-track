import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Read request to ensure on-demand dynamic execution
  void request.url;
  try {
    // Lightweight database query to verify connectivity
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json(
      {
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database: "connected",
        service: "moneytrack",
        version: "1.0.0",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database: "disconnected",
        service: "moneytrack",
        error: error instanceof Error ? error.message : "Database connection failed",
      },
      { status: 503 }
    );
  }
}
