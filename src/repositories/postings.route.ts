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
          slug: await createSlug(
            jobData.title,
            jobData.category,
            jobData.job_type
          ),
          company_id: company.company_id,
          expiredAt: new Date(data.expiredAt),
          latitude: data.latitude.toString(),
          longitude: data.longitude.toString(),
          skills: {
            connect: skills.map((skill) => ({
              id: skill.id,
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
    company_id: number,
    page: number = 1,
    limit: number = 6
  ) => {
    const skip = (page - 1) * limit;
    const categoryFilter: Category | undefined =
      category && category.toLowerCase() !== "all"
        ? (category.toUpperCase() as Category)
        : undefined;

    const data = await prisma.jobs.findMany({
      where: {
        company_id,
        title: { contains: search, mode: "insensitive" },
        category: categoryFilter,
        deletedAt: null,
      },
      orderBy: sort === "asc" ? { createdAt: "asc" } : { createdAt: "desc" },
      skip,
      take: limit,
      omit: {
        job_id: true,
      },
    });
    const totalJobs = await prisma.jobs.count({
      where: {
        company_id,
        title: { contains: search, mode: "insensitive" },
        category: categoryFilter,
        deletedAt: null,
      },
    });
    return { data, totalJobs };
  };
  getJobCategories = async (company_id: number) => {
    const categories = await prisma.jobs.findMany({
      where: { company_id, deletedAt: null },
      select: { category: true },
      distinct: ["category"], // ambil yang unik aja
    });
    return categories.map((c) => c.category);
  };
  getDetailJobPosting = async (slug: string) => {
    return await prisma.jobs.findUnique({
      where: { slug, deletedAt: null },
      select: {
        job_id: true,
        title: true,
        slug: true,
        description: true,
        location: true,
        salary: true,
        periodSalary: true,
        currency: true,
        expiredAt: true,
        createdAt: true,
        updatedAt: true,
        category: true,
        latitude: true,
        longitude: true,
        job_type: true,
        skills: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  };
  updateJobPosting = async (slug: string, data: SchemaJobsInput) => {
    const { skills, ...jobData } = data;
    return await prisma.jobs.update({
      where: { slug, deletedAt: null },
      data: {
        ...jobData,
        expiredAt: new Date(jobData.expiredAt),
        latitude: jobData.latitude.toString(),
        longitude: jobData.longitude.toString(),
        skills: {
          set: skills.map((skill) => ({ id: skill.id })), //set sama seperti reset relasi lama ganti ke yang baru
        },
      },
    });
  };
  deleteJobPosting = async (slug: string) => {
    return await prisma.jobs.update({
      where: { slug },
      data: { deletedAt: new Date() },
    });
  };
}
export default PostingsRepository;
