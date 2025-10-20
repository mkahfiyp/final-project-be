import { SkillAssessmentDTO, SkillCreateDTO } from "../dto/skillAssessment.dto";
import SkillRepository from "../repositories/skillAssessment.repository";

class SkillAssessmentService {
    private skillRepo = new SkillRepository();

    getAllData = async () => {
        return await this.skillRepo.getAllData();
    };

    getDataById = async (assessment_id: number) => {
        const data: SkillAssessmentDTO[] = await this.skillRepo.getDataById(assessment_id);
        return data;
    }

    createSkill = async (data: SkillCreateDTO) => {
        return await this.skillRepo.createSkill(data);
    };

    deleteSkill = async (id: number) => {
        return await this.skillRepo.deleteSkill(id);
    };

    updateSkill = async (id: number, data: SkillCreateDTO) => {
        return await this.skillRepo.updateSkill(id, data);
    };
}

export default SkillAssessmentService;