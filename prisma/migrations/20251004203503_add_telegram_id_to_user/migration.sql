/*
  Warnings:

  - You are about to drop the column `chatid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telegramId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_uri]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `telegramId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LANG" AS ENUM ('eng', 'uz', 'ru');

-- DropIndex
DROP INDEX "public"."User_chatid_key";

-- DropIndex
DROP INDEX "public"."User_username_key";

-- DropIndex
DROP INDEX "public"."User_wallet_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chatid",
DROP COLUMN "name",
DROP COLUMN "wallet",
ADD COLUMN     "balans" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lang" "LANG" NOT NULL DEFAULT 'uz',
ADD COLUMN     "telegramId" INTEGER NOT NULL,
ADD COLUMN     "wallet_uri" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_uri_key" ON "User"("wallet_uri");
