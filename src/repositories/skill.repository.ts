import { prisma } from "../config/prisma"

class SkillRepository {
    getAllData = async () => {
        return await prisma.skills.findMany({});
    }
}

export default SkillRepository;