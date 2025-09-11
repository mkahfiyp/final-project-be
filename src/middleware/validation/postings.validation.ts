import { z } from "zod";
import {
  Currency,
  PeriodSalary,
  JobType,
  Category,
} from "../../../prisma/generated/client";

// ambil semua nilai enum Prisma
const periodValues = Object.values(PeriodSalary) as [string, ...string[]];
const currencyValues = Object.values(Currency) as [string, ...string[]];
const jobTypeValues = Object.values(JobType) as [string, ...string[]];
const categoryValues = Object.values(Category) as [string, ...string[]];

export const schemaJobsInput = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),

  category: z
    .enum(categoryValues)
    .transform((val) => Category[val as keyof typeof Category]),

  job_type: z
    .enum(jobTypeValues)
    .transform((val) => JobType[val as keyof typeof JobType]),

  skills: z
    .array(
      z.object({
        id: z.any(),
        name: z.string().min(1, "Skill name is required"),
      })
    )
    .min(1, "At least one skill is required"),

  salary: z.number().positive("Salary must be positive"),

  periodSalary: z
    .enum(periodValues)
    .transform((val) => PeriodSalary[val as keyof typeof PeriodSalary]),

  currency: z
    .enum(currencyValues)
    .default("USD")
    .transform((val) => Currency[val as keyof typeof Currency]),

  expiredAt: z.string().refine(
    (val) => {
      const date = new Date(val);
      const now = new Date();
      return !isNaN(date.getTime()) && date >= now;
    },
    {
      message: "Expire date must be a valid date and cannot be in the past",
    }
  ),

  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),

  location: z.string().min(2, "Location is required"),
  description: z
    .string()
    .min(10, "Job description must be at least 10 characters")
    .max(20000, "Job description too long"),
});

// auto type (hasil transform siap dipakai di Prisma)
export type SchemaJobsInput = z.infer<typeof schemaJobsInput>;
