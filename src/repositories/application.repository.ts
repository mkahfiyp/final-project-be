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
      }
    })
  }

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
  getDetailApplication = async (
    application_id: number,
    selection_id: number | null,
    user_id: number
  ) => {
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
            user_selection: selection_id !== null
              ? {
                where: {
                  selection_id: Number(selection_id), // pastikan int
                  user_id,
                },
                select: {
                  score: true,
                  selection_id: true,
                },
              }
              : {
                select: {
                  score: true,
                  selection_id: true,
                },
              }
          },
        },
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
}
export default ApplicationRepository;
