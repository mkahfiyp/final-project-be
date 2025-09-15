import ApplicationRepository from "../repositories/application.repository";
import AppError from "../errors/appError";
import { JobType, Status } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import { FilterApplicant } from "../dto/application.dto";
import { processApplicantList } from "../helper/refactorGetCompanyService";
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

  getCompanyApplicant = async (
    slug: string,
    filters: FilterApplicant,
    limit: number,
    offset: number
  ) => {
    const job = await this.applicationRepository.getJobId(slug);
    if (!job) throw new AppError("cannot find job id", 400);

    const selectionId = await this.applicationRepository.getSelectionId(
      job.job_id
    );
    if (!selectionId) throw new AppError("cannot find selection id", 400);

    const isPreselectionTrue = job.preselection_test;

    const applicantList =
      await this.applicationRepository.getApplicantListByJobId(
        job.job_id,
        selectionId.selection_id
      );

    const mappedList = processApplicantList(
      applicantList,
      filters,
      isPreselectionTrue,
      selectionId.passingScore
    );

    const total = mappedList.length;

    const paginatedList = mappedList.slice(offset, offset + limit);

    return {
      data: paginatedList,
      total,
    };
  };

  getDetailApplication = async (application_id: number) => {
    const user = await prisma.applications.findUnique({
      where: { application_id },
    });
    if (!user?.job_id || !user.user_id) {
      throw new AppError("cannot find user", 400);
    }
    const selection = await this.applicationRepository.getSelectionId(
      user?.job_id
    );
    if (!selection || !selection.selection_id) {
      throw new AppError("cannot find selection id", 400);
    }
    const detailApplicant =
      await this.applicationRepository.getDetailApplication(
        application_id,
        selection?.selection_id,
        user.user_id
      );
    if (!detailApplicant) {
      throw new AppError("cannotn find detail applicant", 400);
    }
    const userCertificate = await prisma.userAssessments.findMany({
      where: { user_id: user.user_id },
      include: {
        assessment_certificates: {
          select: {
            certificate_code: true,
          },
        },
      },
    });
    const afterMap = {
      name: detailApplicant.Users?.name,
      email: detailApplicant.Users?.email,
      profile_picture: detailApplicant.Users?.profiles?.profile_picture,
      score: detailApplicant.Users?.user_selection?.[0]?.score ?? null,
      appliedOn: detailApplicant.createdAt,
      phone: detailApplicant.Users?.profiles?.phone,
      address: detailApplicant.Users?.profiles?.address,
      birthDate: detailApplicant.Users?.profiles?.birthDate,
      jobTitle: detailApplicant.Jobs?.title,
      JobType: detailApplicant.Jobs?.job_type,
      jobCategory: detailApplicant.Jobs?.category,
      status: detailApplicant.status,
      age: detailApplicant.Users?.profiles?.birthDate
        ? Math.floor(
            (Date.now() -
              new Date(detailApplicant.Users.profiles.birthDate).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25)
          )
        : null,
      gender: detailApplicant.Users?.profiles?.gender,
      expectedSalary: detailApplicant.expected_salary,
      cvUrl: detailApplicant.cv,
      education: detailApplicant.Users?.education.map((e) => ({
        university: e.university,
        degree: e.degree,
        fieldOfStudy: e.fieldOfStudy,
        startDate: e.startDate,
        endDate: e.endDate,
        description: e.description,
      })),
      experience: detailApplicant.Users?.experience.map((e) => ({
        name: e.name,
        position: e.position,
        description: e.description,
        startDate: e.startDate,
        endDate: e.endDate,
      })),
      CertificatesCode: userCertificate.flatMap((c) =>
        c.assessment_certificates.map((cert) => ({
          code: cert.certificate_code,
        }))
      ),
    };
    return afterMap;
  };

  getApplicationDetail = async () => {};
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
  }
}

export default ApplicationService;
