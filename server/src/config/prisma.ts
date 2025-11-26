import pkg from "@prisma/client"

// Support different Prisma client export shapes across versions:
// - older: `import { PrismaClient } from '@prisma/client'`
// - newer: default or namespace with `PrismaClient` property
const PrismaClientCtor = (pkg as any).PrismaClient ?? (pkg as any).default ?? pkg

const prisma = new (PrismaClientCtor as any)()

export default prisma