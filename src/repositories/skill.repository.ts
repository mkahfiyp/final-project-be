import { prisma } from "../config/prisma";
import { SkillCreateDTO } from "../dto/skill.dto";

class SkillRepository {
    getAllData = async () => {
        return await prisma.skillAssessments.findMany({
            orderBy: {
                createAt: "desc"
            },
            where: {
                deletedAt: null
            }
        });
    };

    createSkill = async (data: SkillCreateDTO) => {
        return await prisma.skillAssessments.create({ data });
    };

    deleteSkill = async (id: number) => {
        // return await prisma.skillAssessments.delete({ where: { assessment_id: id } })
        return await prisma.skillAssessments.update({ where: { assessment_id: id }, data: { deletedAt: new Date() } })
    };

    updateSkill = async (id: number, data: SkillCreateDTO) => {
        return await prisma.skillAssessments.update({ where: { assessment_id: id }, data });
    }
}

export default SkillRepository;