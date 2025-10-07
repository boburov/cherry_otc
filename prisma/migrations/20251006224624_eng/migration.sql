/*
  Warnings:

  - The values [eng] on the enum `LANG` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LANG_new" AS ENUM ('en', 'uz', 'ru');
ALTER TABLE "public"."User" ALTER COLUMN "lang" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "lang" TYPE "LANG_new" USING ("lang"::text::"LANG_new");
ALTER TYPE "LANG" RENAME TO "LANG_old";
ALTER TYPE "LANG_new" RENAME TO "LANG";
DROP TYPE "public"."LANG_old";
ALTER TABLE "User" ALTER COLUMN "lang" SET DEFAULT 'uz';
COMMIT;
