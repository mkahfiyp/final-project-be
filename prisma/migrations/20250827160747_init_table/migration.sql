-- CreateEnum
CREATE TYPE "public"."CorrectOptionEnum" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'COMPANY', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "public"."JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE', 'CONTRACT', 'TEMPORARY', 'REMOTE', 'HYBRID');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('SOFTWARE_ENGINEERING', 'DATA_SCIENCE', 'PRODUCT_MANAGEMENT', 'DESIGN', 'MARKETING', 'SALES', 'CUSTOMER_SERVICE', 'FINANCE', 'HUMAN_RESOURCES', 'OPERATIONS', 'EDUCATION', 'HEALTHCARE', 'MANUFACTURING', 'CONSTRUCTION', 'OTHERS');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('SUBMITTED', 'IN_REVIEW', 'INTERVIEW', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."CorrectOption" AS ENUM ('a', 'b', 'c', 'd');

-- CreateTable
CREATE TABLE "public"."Selections" (
    "selection_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "result" VARCHAR NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Selections_pkey" PRIMARY KEY ("selection_id")
);

-- CreateTable
CREATE TABLE "public"."SelectionQuestions" (
    "selection_question_id" SERIAL NOT NULL,
    "selection_id" INTEGER NOT NULL,
    "question" VARCHAR NOT NULL,
    "option_A" VARCHAR NOT NULL,
    "option_B" VARCHAR NOT NULL,
    "option_C" VARCHAR NOT NULL,
    "option_D" VARCHAR NOT NULL,
    "correct_option" "public"."CorrectOptionEnum" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelectionQuestions_pkey" PRIMARY KEY ("selection_question_id")
);

-- CreateTable
CREATE TABLE "public"."Interviews" (
    "interview_id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "schedule" VARCHAR NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interviews_pkey" PRIMARY KEY ("interview_id")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "isVerfied" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Companies" (
    "company_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "description" TEXT,
    "website" TEXT,
    "password" TEXT NOT NULL,
    "usersId" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "public"."Profiles" (
    "profile_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "gender" "public"."Gender",
    "address" TEXT,
    "profile_picture" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "public"."Jobs" (
    "job_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "latitude" TEXT NOT NULL,
    "longtitude" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "job_type" "public"."JobType" NOT NULL,
    "preselection_test" BOOLEAN NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "company_id" INTEGER,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "public"."JobSave" (
    "job_save_id" SERIAL NOT NULL,
    "createdAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,
    "job_id" INTEGER,

    CONSTRAINT "JobSave_pkey" PRIMARY KEY ("job_save_id")
);

-- CreateTable
CREATE TABLE "public"."Applications" (
    "application_id" SERIAL NOT NULL,
    "expected_salary" INTEGER NOT NULL,
    "cv" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,
    "job_id" INTEGER,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "public"."UserAssessments" (
    "user_assessment_id" SERIAL NOT NULL,
    "assessment_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "date_taken" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAssessments_pkey" PRIMARY KEY ("user_assessment_id")
);

-- CreateTable
CREATE TABLE "public"."SkillAssessments" (
    "assessment_id" SERIAL NOT NULL,
    "skill_name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillAssessments_pkey" PRIMARY KEY ("assessment_id")
);

-- CreateTable
CREATE TABLE "public"."AssessmentCertificates" (
    "assessment_certificate_id" SERIAL NOT NULL,
    "user_assessment_id" INTEGER NOT NULL,
    "certificate_code" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentCertificates_pkey" PRIMARY KEY ("assessment_certificate_id")
);

-- CreateTable
CREATE TABLE "public"."UserSubscriptions" (
    "user_subscription_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "subscription_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubscriptions_pkey" PRIMARY KEY ("user_subscription_id")
);

-- CreateTable
CREATE TABLE "public"."Subscriptions" (
    "subscription_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "public"."Reviews" (
    "review_id" SERIAL NOT NULL,
    "user_company_id" INTEGER NOT NULL,
    "salary_estimate" INTEGER NOT NULL,
    "rating_culture" INTEGER NOT NULL,
    "rating_work_life_balance" INTEGER NOT NULL,
    "rating_facilities" INTEGER NOT NULL,
    "rating_career" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "public"."UserCompanies" (
    "user_company_id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCompanies_pkey" PRIMARY KEY ("user_company_id")
);

-- CreateTable
CREATE TABLE "public"."AssessmentQuestions" (
    "assessment_question_id" SERIAL NOT NULL,
    "assessment_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "option_a" TEXT NOT NULL,
    "option_b" TEXT NOT NULL,
    "option_c" TEXT NOT NULL,
    "option_d" TEXT NOT NULL,
    "correct_option" "public"."CorrectOption" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentQuestions_pkey" PRIMARY KEY ("assessment_question_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Selections_job_id_key" ON "public"."Selections"("job_id");

-- CreateIndex
CREATE UNIQUE INDEX "Interviews_application_id_key" ON "public"."Interviews"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_name_key" ON "public"."Companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_user_id_key" ON "public"."Companies"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_email_key" ON "public"."Profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_user_id_key" ON "public"."Profiles"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Selections" ADD CONSTRAINT "Selections_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."Jobs"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Selections" ADD CONSTRAINT "Selections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SelectionQuestions" ADD CONSTRAINT "SelectionQuestions_selection_id_fkey" FOREIGN KEY ("selection_id") REFERENCES "public"."Selections"("selection_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Interviews" ADD CONSTRAINT "Interviews_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."Applications"("application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Companies" ADD CONSTRAINT "Companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profiles" ADD CONSTRAINT "Profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Jobs" ADD CONSTRAINT "Jobs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Companies"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobSave" ADD CONSTRAINT "JobSave_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobSave" ADD CONSTRAINT "JobSave_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."Jobs"("job_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Applications" ADD CONSTRAINT "Applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Applications" ADD CONSTRAINT "Applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."Jobs"("job_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAssessments" ADD CONSTRAINT "UserAssessments_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "public"."SkillAssessments"("assessment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAssessments" ADD CONSTRAINT "UserAssessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssessmentCertificates" ADD CONSTRAINT "AssessmentCertificates_user_assessment_id_fkey" FOREIGN KEY ("user_assessment_id") REFERENCES "public"."UserAssessments"("user_assessment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSubscriptions" ADD CONSTRAINT "UserSubscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSubscriptions" ADD CONSTRAINT "UserSubscriptions_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "public"."Subscriptions"("subscription_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reviews" ADD CONSTRAINT "Reviews_user_company_id_fkey" FOREIGN KEY ("user_company_id") REFERENCES "public"."UserCompanies"("user_company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompanies" ADD CONSTRAINT "UserCompanies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompanies" ADD CONSTRAINT "UserCompanies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssessmentQuestions" ADD CONSTRAINT "AssessmentQuestions_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "public"."SkillAssessments"("assessment_id") ON DELETE RESTRICT ON UPDATE CASCADE;
