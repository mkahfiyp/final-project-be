import { Category } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import AppError from "../errors/appError";
import { SchemaJobsInput } from "../middleware/validation/postings.validation";
import { createSlug } from "../utils/createSlug";

class PostingsRepository {
  createJobPosting = async (data: SchemaJobsInput, user_id: number) => {
    return await prisma.$transaction(async (tx) => {
      // 1. Cari company dari user_id
      const company = await tx.companies.findUnique({
        where: { user_id },
      });
      if (!company) throw new AppError("Company not found for this user", 400);

      const { skills, ...jobData } = data;

      // 2. Buat job
      const job = await tx.jobs.create({
        data: {
          ...jobData,
          slug: await createSlug(jobData.title),
          company_id: company.company_id,
          expiredAt: new Date(data.expiredAt),
          latitude: data.latitude.toString(),
          longitude: data.longitude.toString(),
          skills: {
            connectOrCreate: skills.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
        },
      });

      return job;
    });
  };
  getCompanyId = async (user_id: number) => {
    return await prisma.companies.findUnique({
      where: { user_id },
    });
  };
  getMyJobList = async (
    search: string,
    sort: string,
    category: any,
    company_id: number
  ) => {
    return await prisma.jobs.findMany({
      where: {
        company_id,
        title: { contains: search, mode: "insensitive" },
        category: category && category !== "all" ? category : undefined, // kalau category kosong, abaikan filter
      },
      orderBy: sort === "asc" ? { createdAt: "asc" } : { createdAt: "desc" },
      omit: {
        job_id: true,
      },
    });
  };
}
export default PostingsRepository;
