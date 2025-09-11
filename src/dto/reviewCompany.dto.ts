import { z } from "zod";

export const ReviewCreateSchema = z.object({
    company_id: z.number(),
    salary_estimate: z.number()
        .int("Salary estimate must be an integer.")
        .positive("Salary estimate must be a positive number"),
    rating_culture: z.number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
    rating_work_life_balance: z.number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
    rating_facilities: z.number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
    rating_career: z.number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
});

export const ReviewUpdateSchema = z.object({
    salary_estimate: z.number().int().positive().optional(),
    rating_culture: z.number().int().min(1).max(5).optional(),
    rating_work_life_balance: z.number().int().min(1).max(5).optional(),
    rating_facilities: z.number().int().min(1).max(5).optional(),
    rating_career: z.number().int().min(1).max(5).optional(),
}).strip();