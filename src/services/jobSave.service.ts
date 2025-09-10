import JobSaveRepository from "../repositories/jobSave.repository";
import AppError from "../errors/appError";

class JobSaveService {
  private jobSaveRepository = new JobSaveRepository();

  /**
   * Get all saved jobs for a user
   */
  async getSavedJobs(userId: number, page: number = 1, limit: number = 10) {
    try {
      const result = await this.jobSaveRepository.getSavedJobsByUserId(userId, page, limit);
      
      return {
        data: result.data,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages,
        },
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to fetch saved jobs", 500);
    }
  }

  /**
   * Save a job
   */
  async saveJob(userId: number, jobId: number) {
    try {
      return await this.jobSaveRepository.saveJob(userId, jobId);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to save job", 500);
    }
  }

  /**
   * Unsave a job
   */
  async unsaveJob(userId: number, jobId: number) {
    try {
      return await this.jobSaveRepository.unsaveJob(userId, jobId);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to unsave job", 500);
    }
  }

  /**
   * Check if job is saved by user
   */
  async checkJobSaved(userId: number, jobId: number) {
    try {
      return await this.jobSaveRepository.checkJobSaved(userId, jobId);
    } catch (error) {
      throw new AppError("Failed to check job save status", 500);
    }
  }
}

export default JobSaveService;
