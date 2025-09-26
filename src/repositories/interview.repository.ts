import { prisma } from "../config/prisma";
import { InterviewInput } from "../middleware/validation/interview.validation";

class InterviewRepository {
  getCompanyId = async (user_id: number) => {
    return await prisma.users.findUnique({
      where: {
        user_id,
      },
      include: {
        companies: true,
      },
    });
  };
  getAllInterviewForCompany = async (company_id: number) => {
    return await prisma.interviews.findMany({
      where: {
        application: {
          Jobs: {
            company_id,
          },
        },
      },
    });
  };
  createInterview = async (data: InterviewInput) => {
    return await prisma.interviews.create({
      data: { ...data },
      include: {
        application: {
          include: {
            Users: true,
            Jobs: {
              include: {
                Companies: true,
              },
            },
          },
        },
      },
    });
  };
  updateStatus = async (application_id: number) => {
    return await prisma.applications.update({
      where: { application_id },
      data: { status: "INTERVIEW" },
    });
  };
  getInterviewShedule = async (application_id: number) => {
    return await prisma.interviews.findUnique({
      where: {
        application_id,
      },
    });
  };
  updateInterview = async (interview_id: number, data: InterviewInput) => {
    return await prisma.interviews.update({
      where: {
        interview_id,
      },
      data: { ...data },
    });
  };
  getAllInterviewSchedule = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));
    return prisma.interviews.findMany({
      where: {
        startDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        application: {
          include: {
            Users: true,
            Jobs: {
              include: {
                Companies: true,
              },
            },
          },
        },
      },
    });
  };
}

export default InterviewRepository;
