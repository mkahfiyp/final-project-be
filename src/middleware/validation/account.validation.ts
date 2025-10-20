import { z } from "zod";

// Schema validasi update profile
export const schemaUpdateProfileRoleUser = z.object({
  name: z.string().min(1, "Nama harus diisi"), // wajib diisi
  phone: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string(), // kirim format "YYYY-MM-DD"
  address: z.string(),
});

export const schemaCreateEducation = z
  .object({
    university: z.string().min(1, "University is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    startDate: z.string(),
    endDate: z.string().nullable(),
    description: z.string().optional(),
  })
  .refine((data) => !data.endDate || data.startDate <= data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  });
