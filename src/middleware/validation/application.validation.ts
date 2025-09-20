import { z } from "zod";

export const createApplicationSchema = z.object({
  job_id: z.string().transform((val) => parseInt(val)).refine((val) => val > 0, {
    message: "Job ID must be a positive number"
  }),
  expected_salary: z.string().transform((val) => parseInt(val)).refine((val) => val > 0, {
    message: "Expected salary must be a positive number"
  }),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;