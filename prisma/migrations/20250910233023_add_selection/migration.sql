/*
  Warnings:

  - Made the column `passingScore` on table `Selections` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Selections" DROP CONSTRAINT "Selections_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."Selections" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "passingScore" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Selections" ADD CONSTRAINT "Selections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
