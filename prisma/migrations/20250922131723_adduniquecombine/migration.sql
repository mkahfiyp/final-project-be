/*
  Warnings:

  - A unique constraint covering the columns `[user_id,selection_id]` on the table `UserSelection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserSelection_user_id_selection_id_key" ON "public"."UserSelection"("user_id", "selection_id");
