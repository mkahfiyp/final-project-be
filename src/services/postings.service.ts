import { Category } from "../../prisma/generated/client";
import AppError from "../errors/appError";
import { SchemaJobsInput } from "../middleware/validation/postings.validation";
import PostingsRepository from "../repositories/postings.route";

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
    user_id: number
  ) => {
    const company = await this.postingsRepository.getCompanyId(user_id);
    if (!company) {
      throw new AppError("company no found", 400);
    }
    const result = await this.postingsRepository.getMyJobList(
      search,
      sort,
      category,
      company.company_id
    );
    return result;
  };
}

export default PostingsService;
