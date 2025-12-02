import pkg from "@prisma/client";

// Support different Prisma client export shapes across versions
const PrismaClientCtor = (pkg as any).PrismaClient ?? (pkg as any).default ?? pkg;

const prisma = new (PrismaClientCtor as any)();

export default prisma;