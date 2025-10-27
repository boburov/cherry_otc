/*
  Warnings:

  - You are about to drop the column `deal` on the `User` table. All the data in the column will be lost.
  - Made the column `wallet_uri` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "buyerId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deal",
ALTER COLUMN "wallet_uri" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
