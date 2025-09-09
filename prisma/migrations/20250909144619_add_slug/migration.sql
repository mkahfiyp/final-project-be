/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Jobs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Jobs" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_slug_key" ON "public"."Jobs"("slug");
