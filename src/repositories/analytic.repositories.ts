import { prisma } from "../config/prisma";

class AnalyticRepository {
  getAllUsers = async () => {
    return await prisma.applications.findMany({
      include: {
        Users: {
          include: {
            profiles: true,
          },
        },
      },
    });
  };
  getAllCompanies = async () => {
    return await prisma.companies.findMany();
  };
  getAllJobs = async () => {
    return await prisma.jobs.findMany();
  };
  getApplicantions = async () => {
    return await prisma.applications.findMany();
  };
}
export default AnalyticRepository;
