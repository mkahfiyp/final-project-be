import z from "zod";

export interface SkillCreateDTO {
    skill_name: string;
}

export const SkillAssessmentSchema = z.object({
    assessment_id: z.number(),
    skill_name: z.string(),
    createAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().optional().nullable(),
});

export type SkillAssessmentDTO = z.infer<typeof SkillAssessmentSchema>;