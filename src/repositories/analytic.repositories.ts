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
        Jobs: true,
      },
    });
  };
}
export default AnalyticRepository;
