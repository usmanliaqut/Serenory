// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // remove in prod if noisy
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
