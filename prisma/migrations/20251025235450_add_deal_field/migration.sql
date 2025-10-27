/*
  Warnings:

  - Added the required column `deal` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DEAL_STATUS" AS ENUM ('OPEN', 'PAID', 'CANCELLED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deal" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Deal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "creatorTelegram" TEXT NOT NULL,
    "buyerTelegram" TEXT,
    "txHash" TEXT,
    "status" "DEAL_STATUS" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);
