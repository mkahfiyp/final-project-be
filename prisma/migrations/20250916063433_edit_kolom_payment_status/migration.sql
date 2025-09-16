/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `UserSubscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."UserSubscriptions" DROP COLUMN "paymentStatus",
ADD COLUMN     "payment_status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING';
