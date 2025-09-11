import { prisma } from "../config/prisma";
import AppError from "../errors/appError";

class InterviewRepository {
  /**
   * Get interviews for user (as candidate)
   */
  async getInterviewsForUser(userId: number, page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      prisma.interviews.findMany({
        where: {
          application: {
            user_id: userId,
          },
        },
        include: {
          application: {
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
          },
        },
        orderBy: {
          schedule: 'asc',
        },
        skip: offset,
        take: limit,
      }),
      prisma.interviews.count({
        where: {
          application: {
            user_id: userId,
          },
        },
      }),
    ]);

    return {
      data: interviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get interviews for company
   */
  async getInterviewsForCompany(companyId: number, page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      prisma.interviews.findMany({
        where: {
          application: {
            Jobs: {
              company_id: companyId,
            },
          },
        },
        include: {
          application: {
            include: {
              Users: {
                select: {
                  name: true,
                  email: true,
                  profiles: {
                    select: {
                      profile_picture: true,
                      phone: true,
                    },
                  },
                },
              },
              Jobs: {
                select: {
                  title: true,
                  job_id: true,
                },
              },
            },
          },
        },
        orderBy: {
          schedule: 'asc',
        },
        skip: offset,
        take: limit,
      }),
      prisma.interviews.count({
        where: {
          application: {
            Jobs: {
              company_id: companyId,
            },
          },
        },
      }),
    ]);

    return {
      data: interviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get interview by ID
   */
  async getInterviewById(interviewId: number) {
    return await prisma.interviews.findUnique({
      where: {
        interview_id: interviewId,
      },
      include: {
        application: {
          include: {
            Users: {
              select: {
                name: true,
                email: true,
                profiles: true,
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
          },
        },
      },
    });
  }

  /**
   * Create interview
   */
  async createInterview(applicationId: number, schedule: Date) {
    // Check if interview already exists for this application
    const existingInterview = await prisma.interviews.findUnique({
      where: {
        application_id: applicationId,
      },
    });

    if (existingInterview) {
      throw new AppError("Interview already scheduled for this application", 400);
    }

    return await prisma.interviews.create({
      data: {
        application_id: applicationId,
        schedule: schedule,
      },
      include: {
        application: {
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
        },
      },
    });
  }

  /**
   * Update interview schedule
   */
  async updateInterviewSchedule(interviewId: number, schedule: Date) {
    return await prisma.interviews.update({
      where: {
        interview_id: interviewId,
      },
      data: {
        schedule: schedule,
      },
      include: {
        application: {
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
        },
      },
    });
  }
}

export default InterviewRepository;
