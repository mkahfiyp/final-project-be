/*
  Warnings:

  - A unique constraint covering the columns `[user_assessment_id]` on the table `AssessmentCertificates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AssessmentCertificates_user_assessment_id_key" ON "public"."AssessmentCertificates"("user_assessment_id");
