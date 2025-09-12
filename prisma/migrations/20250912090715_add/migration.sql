-- CreateTable
CREATE TABLE "public"."UserAnswer" (
    "user_answer_id" SERIAL NOT NULL,
    "user_selection_id" INTEGER NOT NULL,
    "selection_question_id" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "isCorrect" BOOLEAN,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("user_answer_id")
);

-- AddForeignKey
ALTER TABLE "public"."UserAnswer" ADD CONSTRAINT "UserAnswer_user_selection_id_fkey" FOREIGN KEY ("user_selection_id") REFERENCES "public"."UserSelection"("user_selection_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAnswer" ADD CONSTRAINT "UserAnswer_selection_question_id_fkey" FOREIGN KEY ("selection_question_id") REFERENCES "public"."SelectionQuestions"("selection_question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
