-- CreateTable
CREATE TABLE "public"."UserSkills" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "UserSkills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSkills_userId_skillId_key" ON "public"."UserSkills"("userId", "skillId");

-- AddForeignKey
ALTER TABLE "public"."UserSkills" ADD CONSTRAINT "UserSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSkills" ADD CONSTRAINT "UserSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
