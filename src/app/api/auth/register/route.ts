import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validations/auth.schema";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Format JSON tidak valid atau body kosong.",
          },
        },
        { status: 400 }
      );
    }

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Data registrasi tidak valid",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "DUPLICATE_EMAIL",
            message: "Alamat email sudah terdaftar. Silakan masuk.",
          },
        },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user and default starter categories in a transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email: normalizedEmail,
          passwordHash,
        },
      });

      // Default starter categories
      const defaultCategories = [
        { name: "Makanan & Minuman", type: "EXPENSE" as const, color: "#f59e0b", icon: "Utensils" },
        { name: "Transportasi", type: "EXPENSE" as const, color: "#3b82f6", icon: "Car" },
        { name: "Tagihan & Utilitas", type: "EXPENSE" as const, color: "#8b5cf6", icon: "Zap" },
        { name: "Hiburan & Rekreasi", type: "EXPENSE" as const, color: "#ec4899", icon: "Film" },
        { name: "Kesehatan", type: "EXPENSE" as const, color: "#ef4444", icon: "HeartPulse" },
        { name: "Gaji Utama", type: "INCOME" as const, color: "#10b981", icon: "Briefcase" },
        { name: "Bonus & THR", type: "INCOME" as const, color: "#06b6d4", icon: "Gift" },
        { name: "Proyek Sampingan", type: "INCOME" as const, color: "#14b8a6", icon: "Laptop" },
      ];

      await tx.category.createMany({
        data: defaultCategories.map((c) => ({
          ...c,
          userId: newUser.id,
        })),
      });

      // Create default Cash Account
      await tx.account.create({
        data: {
          userId: newUser.id,
          name: "Kas Tunai",
          type: "CASH",
          initialBalance: BigInt(0),
        },
      });

      return newUser;
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        message: "Akun berhasil didaftarkan",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    const errorMessage =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Terjadi kesalahan internal pada server";

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: errorMessage,
        },
      },
      { status: 500 }
    );
  }
}
