/*
  Warnings:

  - You are about to drop the column `starDate` on the `Education` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Education" DROP COLUMN "starDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
