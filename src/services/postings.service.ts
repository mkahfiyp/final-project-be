import slug from "slug";
import { Category } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import AppError from "../errors/appError";
import { SchemaJobsInput } from "../middleware/validation/postings.validation";
import PostingsRepository from "../repositories/postings.route";
import { parseRequirements } from "../utils/parseRequirments";

class PostingsService {
  private postingsRepository = new PostingsRepository();

  createJobPosting = async (data: SchemaJobsInput, user_id: number) => {
    const result = await this.postingsRepository.createJobPosting(
      data,
      user_id
    );
    if (!result) {
      throw new AppError("faild, create job", 500);
    }
    return result;
  };
  getMyJobList = async (
    search: string,
    sort: string,
    category: any,
    user_id: number,
    page: number,
    limit: number
  ) => {
    const company = await this.postingsRepository.getCompanyId(user_id);
    if (!company) {
      throw new AppError("company no found", 400);
    }
    const result = await this.postingsRepository.getMyJobList(
      search,
      sort,
      category,
      company.company_id,
      page,
      limit
    );
    const totalPage = Math.ceil(result.totalJobs / limit);
    const categories = await this.postingsRepository.getJobCategories(
      company.company_id
    );
    const dataWithReq = result.data.map((job) => ({
      ...job,
      requirements: parseRequirements(job.description, 3),
    }));
    return {
      data: dataWithReq,
      totalJobs: result.totalJobs,
      totalPage,
      categories,
    };
  };
  getDetailJobPostingForEdit = async (slug: string) => {
    const result = await this.postingsRepository.getDetailJobPosting(slug);
    if (!result) {
      throw new AppError("job not found", 400);
    }
    return result;
  };
  updateJobPostring = async (slug: string, data: SchemaJobsInput) => {
    const result = await this.postingsRepository.updateJobPosting(slug, data);
    if (!result) {
      throw new AppError("faild update job", 500);
    }
    return result;
  };
  deleteJobPostring = async (slug: string) => {
    const result = await this.postingsRepository.deleteJobPosting(slug);
    if (!result) {
      throw new AppError("faild delete job posting", 300);
    }
    return result;
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
    const result = await this.postingsRepository.getAllJobPostings(filters);
    const totalPage = Math.ceil(result.totalJobs / filters.limit);
    
    const dataWithReq = result.data.map((job) => ({
      ...job,
      requirements: parseRequirements(job.description, 3),
    }));

    return {
      data: dataWithReq,
      totalJobs: result.totalJobs,
      totalPage,
      currentPage: filters.page,
    };
  };
}

export default PostingsService;
