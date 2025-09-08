/*
  Warnings:

  - Added the required column `university` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Education" ADD COLUMN     "university" TEXT NOT NULL;
