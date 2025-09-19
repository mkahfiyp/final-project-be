import { UserAssessmentCreateDTO, UserAssessmentUpdateDTO } from "../dto/userAssessment.dto";
import UserAssessmentRepository from "../repositories/userAssessment.repository";

class UserAssessmentService {
    private UserAssessmentRepo = new UserAssessmentRepository();

    getUserAssessment = async (user_id: number) => {
        return await this.UserAssessmentRepo.getUserAssessment(user_id);
    }

    getTime = async () => {
        return await this.UserAssessmentRepo.getTime();
    }

    createUserAssessment = async (data: UserAssessmentCreateDTO) => {
        return await this.UserAssessmentRepo.createUserAssessment(data);
    }

    updateUserAssessment = async (data: UserAssessmentUpdateDTO) => {
        return await this.UserAssessmentRepo.updateUserAssessment(data);
    }

    getUserAssessmentById = async (id: number) => {
        return await this.UserAssessmentRepo.getUserAssessmentById(id);
    }
}

export default UserAssessmentService;