/*
  Warnings:

  - Changed the type of `degree` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."DegreeLevel" AS ENUM ('HIGH_SCHOOL', 'DIPLOMA', 'BACHELOR', 'MASTER', 'DOCTORATE');

-- AlterTable
ALTER TABLE "public"."Education" DROP COLUMN "degree",
ADD COLUMN     "degree" "public"."DegreeLevel" NOT NULL;
