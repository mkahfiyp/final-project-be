import { prisma } from "../config/prisma";

class SkillRepository {
  getAllData = async () => {
    return await prisma.skills.findMany({
      orderBy: {
        id: "desc",
      },
    });
  };
}

export default SkillRepository;
