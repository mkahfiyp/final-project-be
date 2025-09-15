/*
  Warnings:

  - You are about to drop the column `schedule` on the `Interviews` table. All the data in the column will be lost.
  - You are about to drop the `UserAnswer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endDate` to the `Interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Interviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."UserAnswer" DROP CONSTRAINT "UserAnswer_selection_question_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAnswer" DROP CONSTRAINT "UserAnswer_user_selection_id_fkey";

-- AlterTable
ALTER TABLE "public"."Interviews" DROP COLUMN "schedule",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."UserAnswer";
