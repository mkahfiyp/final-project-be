/*
  Warnings:

  - Changed the type of `correct_option` on the `AssessmentQuestions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."AssessmentQuestions" DROP COLUMN "correct_option",
ADD COLUMN     "correct_option" "public"."CorrectOptionEnum" NOT NULL;

-- DropEnum
DROP TYPE "public"."CorrectOption";
