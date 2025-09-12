import z from "zod";

export const UserAssessmentCreateSchema = z.object({
    assessment_id: z.number(),
    user_id: z.number(),
    score: z.number().optional(),
});

export type UserAssessmentCreateDTO = z.infer<typeof UserAssessmentCreateSchema>;

export const UserAssessmentUpdateSchema = z.object({
    user_assessment_id: z.number(),
    score: z.number(),
});

export type UserAssessmentUpdateDTO = z.infer<typeof UserAssessmentUpdateSchema>;