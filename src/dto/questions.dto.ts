import z from "zod";
import { CorrectOptionEnum } from "../../prisma/generated/client";

const AssessmentQuestionDto = z.object({
    assessment_question_id: z.number().optional(),
    question: z.string().min(1, "Question is required"),
    option_a: z.string().min(1),
    option_b: z.string().min(1),
    option_c: z.string().min(1),
    option_d: z.string().min(1),
    correct_option: z.nativeEnum(CorrectOptionEnum),
});

export const AssessmentQuestionsDto = z.array(AssessmentQuestionDto);

export type AssessmentQuestionInput = z.infer<typeof AssessmentQuestionDto>;