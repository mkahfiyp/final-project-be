import z from "zod";

export const SkillSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
});

export type SkillGetAllData = z.infer<typeof SkillSchema>;