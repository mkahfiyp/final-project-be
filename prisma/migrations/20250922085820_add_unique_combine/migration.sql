/*
  Warnings:

  - A unique constraint covering the columns `[user_id,job_id]` on the table `Applications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Applications_user_id_job_id_key" ON "public"."Applications"("user_id", "job_id");
