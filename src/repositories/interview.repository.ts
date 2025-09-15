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
    });
  };
  updateStatus = async (application_id: number) => {
    return await prisma.applications.update({
      where: { application_id },
      data: { status: "INTERVIEW" },
    });
  };
}

export default InterviewRepository;
