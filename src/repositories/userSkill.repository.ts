import { prisma } from "../config/prisma";
import {
  UserSkillAddDataDTO,
  UserSkillGetAllDataByUserIdDTO,
} from "../dto/userSkill.dto";

class UserSkillRepository {
  getAllUserSkillByUserId = async (user_id: number) => {
    const data: UserSkillGetAllDataByUserIdDTO[] =
      await prisma.userSkills.findMany({
        where: {
          userId: user_id,
        },
        include: {
          skill: true,
        },
        orderBy: {
          id: "desc",
        },
      });
    return data;
  };

  createUserSkill = async (payload: UserSkillAddDataDTO) => {
    const result: UserSkillGetAllDataByUserIdDTO =
      await prisma.userSkills.create({ data: payload });
    return result;
  };

  deleteUserSkill = async (id: number) => {
    const result = await prisma.userSkills.delete({ where: { id } });
    return result;
  };
}

export default UserSkillRepository;
