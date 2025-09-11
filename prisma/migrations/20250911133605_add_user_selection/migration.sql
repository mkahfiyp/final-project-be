/*
  Warnings:

  - You are about to drop the column `result` on the `Selections` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Selections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Selections" DROP CONSTRAINT "Selections_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."SelectionQuestions" ALTER COLUMN "question" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Selections" DROP COLUMN "result",
DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "public"."UserSelection" (
    "user_selection_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "selection_id" INTEGER NOT NULL,
    "score" DOUBLE PRECISION,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "UserSelection_pkey" PRIMARY KEY ("user_selection_id")
);

-- AddForeignKey
ALTER TABLE "public"."UserSelection" ADD CONSTRAINT "UserSelection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSelection" ADD CONSTRAINT "UserSelection_selection_id_fkey" FOREIGN KEY ("selection_id") REFERENCES "public"."Selections"("selection_id") ON DELETE RESTRICT ON UPDATE CASCADE;
