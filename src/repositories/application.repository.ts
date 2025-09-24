import { Status } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import AppError from "../errors/appError";

class ApplicationRepository {
  getApplicantListByJobId = async (job_id: number, selection_id: number) => {
    return await prisma.applications.findMany({
      where: { job_id },
      select: {
        application_id: true,
        expected_salary: true,
        status: true,
        cv: true,
        createdAt: true,
        Users: {
          select: {
            name: true,
            email: true,
            username: true,
            profiles: true,
            education: true,
            user_selection: {
              where: { selection_id },
              select: { score: true, selection_id: true },
            },
          },
        },
      },
    });
  };

  getApplicationLlistByJobIdWithoutSelectionTes = async (job_id: number) => {
    return await prisma.applications.findMany({
      where: { job_id },
      select: {
        application_id: true,
        expected_salary: true,
        status: true,
        cv: true,
        createdAt: true,
        Users: {
          select: {
            name: true,
            email: true,
            username: true,
            profiles: true,
            education: true,
            user_selection: {
              select: { score: true, selection_id: true },
            },
          },
        },
      },
    });
  };

  getSelectionId = async (job_id: number) => {
    return await prisma.selections.findUnique({
      where: { job_id },
    });
  };
  getJobId = async (slug: string) => {
    return await prisma.jobs.findUnique({
      where: { slug },
    });
  };
  getDetailApplication = async (application_id: number) => {
    return await prisma.applications.findUnique({
      where: { application_id },
      select: {
        application_id: true,
        expected_salary: true,
        status: true,
        interview: true,
        Jobs: true,
        cv: true,
        createdAt: true,
        Users: {
          select: {
            name: true,
            email: true,
            username: true,
            profiles: true,
            education: true,
            experience: true,
          },
        },
      },
    });
  };
  getUserSelection = async (user_id: number, selection_id: number) => {
    return await prisma.userSelection.findUnique({
      where: {
        user_id_selection_id: { user_id, selection_id },
      },
    });
  };
  updateStatus = async (
    status: Status,
    application_id: number,
    company_id: number
  ) => {
    return await prisma.$transaction(async (tx) => {
      const application = await tx.applications.update({
        where: {
          application_id,
        },
        data: { status },
        include: {
          Users: true,
        },
      });
      if (!application || !application.user_id) {
        throw new AppError("faild update status", 200);
      }
      const check = await tx.userCompanies.findFirst({
        where: {
          user_id: application.user_id,
          company_id,
          end_date: null,
        },
      });
      if (check) {
        return application;
      }
      if (status === Status.ACCEPTED) {
        await tx.userCompanies.create({
          data: {
            user_id: application.user_id,
            company_id,
            start_date: new Date(),
          },
        });
      }
      return application;
    });
  };
  createApplicant = async (data: {
    user_id: number;
    job_id: number;
    expected_salary: number;
    cv: string;
  }) => {
    return prisma.applications.create({
      data: {
        user_id: data.user_id,
        job_id: data.job_id,
        expected_salary: data.expected_salary,
        cv: data.cv,
        status: Status.SUBMITTED,
      },
      include: {
        Jobs: {
          select: {
            title: true,
            company_id: true,
            Companies: {
              select: {
                name: true,
              },
            },
          },
        },
        Users: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  };
}
export default ApplicationRepository;
