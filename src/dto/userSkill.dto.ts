import z from "zod";

export const UserSkillSchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive(),
    skillId: z.number().int().positive(),
});

export const UserSKillGetAllDataByUserIdSchema = UserSkillSchema.extend({
    
})

export type UserSkillGetAllDataByUserIdDTO = z.infer<typeof UserSkillSchema>;

export const CreateUserSkillSchema = UserSkillSchema.omit({ id: true });
export type UserSkillAddDataDTO = z.infer<typeof CreateUserSkillSchema>;