import { prisma } from "../config/prisma";
import { SkillAssessmentDTO, SkillCreateDTO } from "../dto/skillAssessment.dto";

class SkillAssessmentRepository {
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

    getDataById = async (assessment_id: number) => {
        const data: SkillAssessmentDTO[] = await prisma.skillAssessments.findMany({
            where: {
                assessment_id,
                deletedAt: null,
            }
        });

        return data;
    }

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

export default SkillAssessmentRepository;