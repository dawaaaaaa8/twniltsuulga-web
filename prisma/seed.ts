import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { scryptSync, randomBytes } from "crypto";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  // ⭐ PrismaLibSQL → PrismaLibSql (жижиг "ql")
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  });

  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL ?? "admin@bbd.mn";
  const password = process.env.ADMIN_PASSWORD ?? "Admin123!";

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "BBD Admin",
      password: hashPassword(password),
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin үүслээ: ${email} / ${password}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});