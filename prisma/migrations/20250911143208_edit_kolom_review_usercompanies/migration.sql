/*
  Warnings:

  - A unique constraint covering the columns `[user_company_id]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."UserCompanies" ALTER COLUMN "end_date" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_user_company_id_key" ON "public"."Reviews"("user_company_id");
