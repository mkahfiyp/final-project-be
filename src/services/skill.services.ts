import { SkillCreateDTO } from "../dto/skill.dto";
import SkillRepository from "../repositories/skill.repository";

class SkillService {
    private skillRepo = new SkillRepository();

    getAllData = async () => {
        return await this.skillRepo.getAllData();
    };

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

export default SkillService;