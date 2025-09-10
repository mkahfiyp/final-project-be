import { prisma } from "../config/prisma";
import AppError from "../errors/appError";

class JobSaveRepository {
  /**
   * Get all saved jobs for a user with pagination
   */
  async getSavedJobsByUserId(userId: number, page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [savedJobs, total] = await Promise.all([
      prisma.jobSave.findMany({
        where: {
          user_id: userId,
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
              skills: true,
            },
          },
        },
        orderBy: {
          createdAd: 'desc',
        },
        skip: offset,
        take: limit,
      }),
      prisma.jobSave.count({
        where: {
          user_id: userId,
        },
      }),
    ]);

    return {
      data: savedJobs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Check if job is already saved by user
   */
  async checkJobSaved(userId: number, jobId: number) {
    const savedJob = await prisma.jobSave.findFirst({
      where: {
        user_id: userId,
        job_id: jobId,
      },
    });

    return !!savedJob;
  }

  /**
   * Save a job
   */
  async saveJob(userId: number, jobId: number) {
    // Check if job exists
    const job = await prisma.jobs.findUnique({
      where: {
        job_id: jobId,
      },
    });

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    // Check if already saved
    const existingSave = await this.checkJobSaved(userId, jobId);
    if (existingSave) {
      throw new AppError("Job already saved", 400);
    }

    return await prisma.jobSave.create({
      data: {
        user_id: userId,
        job_id: jobId,
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
   * Unsave a job
   */
  async unsaveJob(userId: number, jobId: number) {
    const savedJob = await prisma.jobSave.findFirst({
      where: {
        user_id: userId,
        job_id: jobId,
      },
    });

    if (!savedJob) {
      throw new AppError("Job not found in saved list", 404);
    }

    return await prisma.jobSave.delete({
      where: {
        job_save_id: savedJob.job_save_id,
      },
    });
  }
}

export default JobSaveRepository;
