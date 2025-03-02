import pkg from "@prisma/client";
const { PrismaClient } = pkg;

export const prisma = new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;