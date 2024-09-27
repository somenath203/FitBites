import { PrismaClient } from "@prisma/client";


const prismaClient = () => {
  return new PrismaClient();
};


const globalForPrisma = globalThis || global;


const prisma = globalForPrisma.prisma || prismaClient();


module.exports = prisma;


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;