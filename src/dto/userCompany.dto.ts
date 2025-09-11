import { z } from "zod";

export const UserCompanyCreateSchema = z.object({
    company_id: z.number().int().positive(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date().optional().nullable(),
}).refine((data) => {
    if (data.end_date) {
        return data.end_date >= data.start_date;
    }
    return true;
}, {
    message: "End date cannot be earlier than start date",
    path: ["end_date"],
});

export type UserCompanyCreateDto = z.infer<typeof UserCompanyCreateSchema>;

export const UserCompanyUpdateSchema = z.object({
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional().nullable(),
}).refine((data) => {
    if (data.start_date && data.end_date) {
        return data.end_date >= data.start_date;
    }
    return true;
}, {
    message: "End date cannot be earlier than start date",
    path: ["end_date"],
}).strip();

export type UserCompanyUpdateDto = z.infer<typeof UserCompanyUpdateSchema>;