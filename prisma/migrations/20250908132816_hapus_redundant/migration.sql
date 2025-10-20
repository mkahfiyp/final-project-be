/*
  Warnings:

  - You are about to drop the column `usersId` on the `Companies` table. All the data in the column will be lost.
  - Made the column `starDate` on table `Education` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Experience` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Companies" DROP COLUMN "usersId";

-- AlterTable
ALTER TABLE "public"."Education" ALTER COLUMN "starDate" SET NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Experience" ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;
