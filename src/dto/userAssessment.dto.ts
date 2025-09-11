import z from "zod";

export const UserAssessmentCreateSchema = z.object({
    assessment_id: z.number(),
    user_id: z.number(),
    score: z.number(),
});

export type UserAssessmentCreateDTO = z.infer<typeof UserAssessmentCreateSchema>;