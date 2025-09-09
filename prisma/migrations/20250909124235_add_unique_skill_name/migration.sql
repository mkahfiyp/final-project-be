/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Skills` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Jobs" ALTER COLUMN "preselection_test" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Skills_name_key" ON "public"."Skills"("name");
