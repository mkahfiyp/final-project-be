/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `schedule` on the `Interviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `currency` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodSalary` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredSkill` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `Profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PeriodSalary" AS ENUM ('MONTH', 'YEAR', 'DAY', 'HOUR');

-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('RP', 'DOLLAR', 'EURO');

-- DropIndex
DROP INDEX "public"."Companies_name_key";

-- AlterTable
ALTER TABLE "public"."Interviews" DROP COLUMN "schedule",
ADD COLUMN     "schedule" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Jobs" ADD COLUMN     "currency" "public"."Currency" NOT NULL,
ADD COLUMN     "periodSalary" "public"."PeriodSalary" NOT NULL,
ADD COLUMN     "requiredSkill" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Profiles" ADD COLUMN     "education" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Selections" ADD COLUMN     "passingScore" INTEGER;

-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Companies_email_key" ON "public"."Companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "public"."Users"("username");
