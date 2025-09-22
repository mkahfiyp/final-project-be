import { UserSkillAddDataDTO } from "../dto/userSkill.dto";
import UserSkillRepository from "../repositories/userSkill.repository";

class UserSkillService {
    private userSkillRepo: UserSkillRepository = new UserSkillRepository();

    getAllUserSkillByUserId = async (user_id: number) => {
        const data = await this.userSkillRepo.getAllUserSkillByUserId(user_id);
        return data;
    }

    createUserSkill = async (payload: UserSkillAddDataDTO) => {
        const result = await this.userSkillRepo.createUserSkill(payload);
        return result;
    }

    deleteUserSkill = async (id: number) => {
        const result = await this.userSkillRepo.deleteUserSkill(id);
        return result;
    }
}

export default UserSkillService;