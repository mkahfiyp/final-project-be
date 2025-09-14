import z from "zod";
import { UserCompanyCreateSchema } from "./userCompany.dto";

export const CompanySchema = z.object({
    company_id: z.number().int(),
    name: z.string(),
    email: z.email(),
    phone: z.string(),
    description: z.string(),
    website: z.string(),
    profile_picture: z.string(),
    user_company: z.array(UserCompanyCreateSchema),
});

export type CompanyDTO = z.infer<typeof CompanySchema>;