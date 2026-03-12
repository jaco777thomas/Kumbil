import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";

dotenv.config();

function parseDbUrl(url: string) {
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port ? parseInt(u.port) : 3306,
      user: u.username,
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ""),
    };
  } catch {
    return {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Kumbil_DB_Strong2026",
      database: "kumbil_db",
    };
  }
}

async function test() {
  console.log('Testing connection...')
  const dbConfig = parseDbUrl(process.env.DATABASE_URL || "");
  console.log('Config:', { ...dbConfig, password: '***' });

  const adapter = new PrismaMariaDb(dbConfig);
  const prisma = new PrismaClient({ adapter } as any);

  try {
    const count = await prisma.admin.count();
    console.log('Connection successful! Admin count:', count);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
