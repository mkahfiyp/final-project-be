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
        include: { Users: true },
      });
      if (!company || !company.Users)
        throw new AppError("Company not found for this user", 400);

      const { skills, ...jobData } = data;

      // 2. Buat job
      const job = await tx.jobs.create({
        data: {
          ...jobData,
          slug: await createSlug(
            jobData.title,
            jobData.category,
            jobData.job_type,
            company.Users?.username
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
    limit: number = 6,
    onlyPreselection?: string,
    notExpired?: string
  ) => {
    const skip = (page - 1) * limit;
    const categoryFilter: Category | undefined =
      category && category.toLowerCase() !== "all"
        ? (category.toUpperCase() as Category)
        : undefined;
    const whereFilter: any = {
      company_id,
      title: { contains: search, mode: "insensitive" },
      category: categoryFilter,
      deletedAt: null,
      ...(onlyPreselection === "true" && {
        preselection_test: true,
      }),
      ...(notExpired === "true" && {
        expiredAt: {
          gte: new Date(),
        },
      }),
    };

    const data = await prisma.jobs.findMany({
      where: whereFilter,
      orderBy: sort === "asc" ? { createdAt: "asc" } : { createdAt: "desc" },
      skip,
      take: limit,
      omit: {
        job_id: true,
      },
    });
    const totalJobs = await prisma.jobs.count({
      where: whereFilter,
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
        deletedAt: true,
        preselection_test: true,
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

  getAllJobPostings = async (filters: {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    location?: string;
    job_type?: string;
    salary_min?: number;
    salary_max?: number;
  }) => {
    const {
      page,
      limit,
      search,
      category,
      location,
      job_type,
      salary_min,
      salary_max,
    } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      deletedAt: null,
      expiredAt: {
        gte: new Date(), // Only show jobs that haven't expired
      },
    };

    // Add search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        {
          Companies: {
            name: { contains: search, mode: "insensitive" },
          },
        },
      ];
    }

    // Add category filter
    if (category) {
      where.category = category;
    }

    // Add location filter
    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    // Add job_type filter
    if (job_type) {
      where.job_type = job_type;
    }

    // Add salary range filter
    if (salary_min !== undefined || salary_max !== undefined) {
      where.salary = {};
      if (salary_min !== undefined) {
        where.salary.gte = salary_min;
      }
      if (salary_max !== undefined) {
        where.salary.lte = salary_max;
      }
    }

    // Get jobs with count
    const [jobs, totalJobs] = await Promise.all([
      prisma.jobs.findMany({
        where,
        include: {
          Companies: {
            select: {
              company_id: true,
              name: true,
              profile_picture: true,
              website: true,
            },
          },
          skills: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.jobs.count({ where }),
    ]);

    return {
      data: jobs,
      totalJobs,
    };
  };
}
export default PostingsRepository;
