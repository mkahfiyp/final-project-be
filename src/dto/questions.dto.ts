import { CorrectOption } from "../../prisma/generated/client";

export interface CreateQuestionDTO {
    // assessment_id: number;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: CorrectOption;
}