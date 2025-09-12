import ApplicationRepository from "../repositories/application.repository";
import AppError from "../errors/appError";
import { Status } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import { FilterApplicant } from "../dto/application.dto";
class ApplicationService {
  private applicationRepository = new ApplicationRepository();

  /**
   * Get applications for a user
   */
  async getMyApplications(
    userId: number,
    page: number = 1,
    limit: number = 10,
    status?: string
  ) {
    try {
      const result = await this.applicationRepository.getApplicationsByUserId(
        userId,
        page,
        limit,
        status
      );

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
      throw new AppError("Failed to fetch user applications", 500);
    }
  }

  getCompanyApplicant = async (slug: string, filters: FilterApplicant) => {
    const job = await this.applicationRepository.getJobId(slug);
    if (!job) {
      throw new AppError("cannot find job id", 400);
    }
    const applicantList =
      await this.applicationRepository.getApplicantListByJobId(job?.job_id);
    const filteredAndSorted = applicantList.filter((val) => {
      const user = val.Users;
      if (!user) return false;
      //status
      if (
        filters.status &&
        filters.status !== "all" &&
        val.status !== filters.status
      )
        return false;
      // age
      if (filters.minAge || filters.maxAge) {
        const birthDate = user.profiles?.birthDate;
        if (birthDate) {
          const age = Math.floor(
            (new Date().getTime() - new Date(birthDate).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25)
          );
          if (filters.minAge && age < filters.minAge) return false;
          if (filters.maxAge && age > filters.maxAge) return false;
        }
      }

      // salary
      if (filters.minSalary && val.expected_salary < filters.minSalary)
        return false;
      if (filters.maxSalary && val.expected_salary > filters.maxSalary)
        return false;

      // education
      if (filters.education && user.profiles?.education !== filters.education)
        return false;

      return true;
    });
    return filteredAndSorted;
  };
  /**
   * Get application detail
   */
  async getApplicationDetail(applicationId: number, userId: number) {
    try {
      const application = await this.applicationRepository.getApplicationById(
        applicationId
      );

      if (!application) {
        throw new AppError("Application not found", 404);
      }

      // Check if user has permission to view this application
      // User can view their own applications or company can view applications for their jobs
      const isOwner = application.user_id === userId;

      if (!isOwner) {
        const company = await prisma.companies.findUnique({
          where: {
            user_id: userId,
          },
        });

        const isCompanyOwner =
          company && application.Jobs?.company_id === company.company_id;

        if (!isCompanyOwner) {
          throw new AppError("Unauthorized to view this application", 403);
        }
      }

      return application;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to fetch application detail", 500);
    }
  }

  /**
   * Apply for a job
   */
  async applyForJob(
    userId: number,
    jobId: number,
    expectedSalary: number,
    cv: string
  ) {
    // Validate required fields
    if (!jobId || !expectedSalary || !cv) {
      throw new AppError(
        "Missing required fields: job_id, expected_salary, cv",
        400
      );
    }

    // Check if job exists and is not expired
    const job = await prisma.jobs.findUnique({
      where: {
        job_id: jobId,
      },
    });

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.deletedAt) {
      throw new AppError("Job is no longer available", 400);
    }

    if (new Date() > new Date(job.expiredAt)) {
      throw new AppError("Job application deadline has passed", 400);
    }

    try {
      return await this.applicationRepository.createApplication(
        userId,
        jobId,
        expectedSalary,
        cv
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to submit application", 500);
    }
  }

  /**
   * Update application status (company only)
   */
  async updateApplicationStatus(
    applicationId: number,
    status: string,
    userId: number
  ) {
    // Validate status
    const validStatuses = Object.values(Status);
    if (!validStatuses.includes(status as Status)) {
      throw new AppError("Invalid status", 400);
    }

    try {
      // Get application first
      const application = await this.applicationRepository.getApplicationById(
        applicationId
      );

      if (!application) {
        throw new AppError("Application not found", 404);
      }

      // Check if user is the company owner
      const company = await prisma.companies.findUnique({
        where: {
          user_id: userId,
        },
      });

      if (!company || application.Jobs?.company_id !== company.company_id) {
        throw new AppError("Unauthorized to update this application", 403);
      }

      return await this.applicationRepository.updateApplicationStatus(
        applicationId,
        status as Status
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to update application status", 500);
    }
  }
}

export default ApplicationService;
