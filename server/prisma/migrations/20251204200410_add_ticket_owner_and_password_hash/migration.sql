/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "ticketId" TEXT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "ownerId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "passwordHash" TEXT;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
