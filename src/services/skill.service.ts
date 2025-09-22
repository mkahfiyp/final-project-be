import SkillRepository from "../repositories/skill.repository";

class SkillService {
    private skillRepo = new SkillRepository();

    getAllData = async () => {
        return await this.skillRepo.getAllData();
    }
}

export default SkillService;