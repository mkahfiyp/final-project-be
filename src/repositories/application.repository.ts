import { prisma } from "../config/prisma";
import AppError from "../errors/appError";
import { Status } from "../../prisma/generated/client";

class ApplicationRepository {
  /**
   * Get applications for a user
   */
  async getApplicationsByUserId(
    userId: number,
    page: number,
    limit: number,
    status?: string
  ) {
    const offset = (page - 1) * limit;

    const where: any = {
      user_id: userId,
    };

    if (status) {
      where.status = status as Status;
    }

    const [applications, total] = await Promise.all([
      prisma.applications.findMany({
        where,
        include: {
          Jobs: {
            include: {
              Companies: {
                select: {
                  name: true,
                  profile_picture: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: offset,
        take: limit,
      }),
      prisma.applications.count({
        where,
      }),
    ]);

    return {
      data: applications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  getApplicantListByJobId = async (job_id: number) => {
    return await prisma.applications.findMany({
      where: { job_id },
      include: {
        Users: {
          select: {
            name: true,
            email: true,
            profiles: true,
          },
        },
      },
    });
  };
  getJobId = async (slug: string) => {
    return await prisma.jobs.findUnique({
      where: { slug },
    });
  };

  /**
   * Get application by ID
   */
  async getApplicationById(applicationId: number) {
    return await prisma.applications.findUnique({
      where: {
        application_id: applicationId,
      },
      include: {
        Users: {
          select: {
            name: true,
            email: true,
            profiles: true,
            education: true,
            experience: true,
          },
        },
        Jobs: {
          include: {
            Companies: {
              select: {
                name: true,
                profile_picture: true,
              },
            },
          },
        },
        interview: true,
      },
    });
  }

  /**
   * Create new application
   */
  async createApplication(
    userId: number,
    jobId: number,
    expectedSalary: number,
    cv: string
  ) {
    // Check if user already applied for this job
    const existingApplication = await prisma.applications.findFirst({
      where: {
        user_id: userId,
        job_id: jobId,
      },
    });

    if (existingApplication) {
      throw new AppError("You have already applied for this job", 400);
    }

    return await prisma.applications.create({
      data: {
        user_id: userId,
        job_id: jobId,
        expected_salary: expectedSalary,
        cv: cv,
        status: Status.SUBMITTED,
      },
      include: {
        Jobs: {
          include: {
            Companies: {
              select: {
                name: true,
                profile_picture: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Update application status
   */
  async updateApplicationStatus(applicationId: number, status: Status) {
    return await prisma.applications.update({
      where: {
        application_id: applicationId,
      },
      data: {
        status: status,
      },
      include: {
        Users: {
          select: {
            name: true,
            email: true,
          },
        },
        Jobs: {
          select: {
            title: true,
          },
        },
      },
    });
  }
}

export default ApplicationRepository;
