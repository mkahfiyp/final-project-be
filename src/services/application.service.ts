import ApplicationRepository from "../repositories/application.repository";
import AppError from "../errors/appError";
import { Status } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";

class ApplicationService {
  private applicationRepository = new ApplicationRepository();

  /**
   * Get applications for a user
   */
  async getMyApplications(userId: number, page: number = 1, limit: number = 10, status?: string) {
    try {
      const result = await this.applicationRepository.getApplicationsByUserId(userId, page, limit, status);
      
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

  /**
   * Get applications for company
   */
  async getCompanyApplications(
    userId: number, 
    page: number = 1, 
    limit: number = 10, 
    jobId?: number, 
    status?: string
  ) {
    try {
      // Get company ID from user ID
      const company = await prisma.companies.findUnique({
        where: {
          user_id: userId,
        },
      });

      if (!company) {
        throw new AppError("Company not found for this user", 404);
      }

      const result = await this.applicationRepository.getApplicationsForCompany(
        company.company_id, 
        page, 
        limit, 
        jobId, 
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
      throw new AppError("Failed to fetch company applications", 500);
    }
  }

  /**
   * Get application detail
   */
  async getApplicationDetail(applicationId: number, userId: number) {
    try {
      const application = await this.applicationRepository.getApplicationById(applicationId);

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

        const isCompanyOwner = company && application.Jobs?.company_id === company.company_id;
        
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
  async applyForJob(userId: number, jobId: number, expectedSalary: number, cv: string) {
    // Validate required fields
    if (!jobId || !expectedSalary || !cv) {
      throw new AppError("Missing required fields: job_id, expected_salary, cv", 400);
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
      return await this.applicationRepository.createApplication(userId, jobId, expectedSalary, cv);
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
  async updateApplicationStatus(applicationId: number, status: string, userId: number) {
    // Validate status
    const validStatuses = Object.values(Status);
    if (!validStatuses.includes(status as Status)) {
      throw new AppError("Invalid status", 400);
    }

    try {
      // Get application first
      const application = await this.applicationRepository.getApplicationById(applicationId);

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

      return await this.applicationRepository.updateApplicationStatus(applicationId, status as Status);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to update application status", 500);
    }
  }
}

export default ApplicationService;
