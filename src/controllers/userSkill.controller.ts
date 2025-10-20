import { NextFunction, Request, Response } from "express";
import UserSkillService from "../services/userSkill.service";
import { sendResponse } from "../utils/sendResponse";
import { UserSkillAddDataDTO } from "../dto/userSkill.dto";

class UserSkillController {
    private userSkillService: UserSkillService = new UserSkillService();

    getAllUserSkillByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id: number = Number(res.locals.decript.id);
            const data = await this.userSkillService.getAllUserSkillByUserId(user_id);
            sendResponse(res, "Get All data skill by user id", 200, data);
        } catch (error) {
            next(error);
        }
    }

    createUserSkill = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id: number = Number(res.locals.decript.id);
            const payload: UserSkillAddDataDTO = {
                userId: user_id,
                skillId: req.body.skillId
            };
            const result = await this.userSkillService.createUserSkill(payload);
            sendResponse(res, "Add user skill", 200, result);
        } catch (error) {
            next(error);
        }
    }

    deleteUserSkill = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_skill_id: number = Number(req.params.id);
            const result = await this.userSkillService.deleteUserSkill(user_skill_id);
            sendResponse(res, "Deleted user skill", 200, result);
        } catch (error) {
            next(error);
        }
    }
}

export default UserSkillController;