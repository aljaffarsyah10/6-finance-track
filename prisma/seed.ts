import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://moneytrack:moneytrack_dev@localhost:5432/moneytrack";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Mulai seeding database development...");

  const email = "demo@moneytrack.local";
  const passwordHash = await bcrypt.hash("password123", 10);

  // 1. Create or update Demo User
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Demo User",
      email,
      passwordHash,
    },
  });

  console.log(`👤 User demo siap: ${user.email}`);

  // 2. Default accounts
  const accountsData = [
    { name: "Kas Dompet (Cash)", type: "CASH" as const, initialBalance: BigInt(500000) },
    { name: "Bank BCA", type: "BANK" as const, initialBalance: BigInt(12000000) },
    { name: "Bank Mandiri", type: "BANK" as const, initialBalance: BigInt(5000000) },
    { name: "GoPay / OVO", type: "E_WALLET" as const, initialBalance: BigInt(300000) },
  ];

  const createdAccounts = [];
  for (const acc of accountsData) {
    const existing = await prisma.account.findFirst({
      where: { userId: user.id, name: acc.name },
    });
    if (!existing) {
      const created = await prisma.account.create({
        data: { ...acc, userId: user.id },
      });
      createdAccounts.push(created);
    } else {
      createdAccounts.push(existing);
    }
  }

  // 3. Default categories
  const categoriesData = [
    { name: "Makanan & Minuman", type: "EXPENSE" as const, color: "#f59e0b", icon: "Utensils" },
    { name: "Transportasi", type: "EXPENSE" as const, color: "#3b82f6", icon: "Car" },
    { name: "Tagihan & Utilitas", type: "EXPENSE" as const, color: "#8b5cf6", icon: "Zap" },
    { name: "Hiburan & Rekreasi", type: "EXPENSE" as const, color: "#ec4899", icon: "Film" },
    { name: "Gaji Utama", type: "INCOME" as const, color: "#10b981", icon: "Briefcase" },
    { name: "Proyek Freelance", type: "INCOME" as const, color: "#14b8a6", icon: "Laptop" },
  ];

  const createdCategories = [];
  for (const cat of categoriesData) {
    const existing = await prisma.category.findFirst({
      where: { userId: user.id, name: cat.name, type: cat.type },
    });
    if (!existing) {
      const created = await prisma.category.create({
        data: { ...cat, userId: user.id },
      });
      createdCategories.push(created);
    } else {
      createdCategories.push(existing);
    }
  }

  console.log("✅ Seed database selesai.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
