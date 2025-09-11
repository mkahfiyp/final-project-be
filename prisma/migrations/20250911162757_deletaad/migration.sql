/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Selections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Selections" DROP COLUMN "deletedAt";
