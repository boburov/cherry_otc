import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
