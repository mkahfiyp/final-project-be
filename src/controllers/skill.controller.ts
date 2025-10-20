import { NextFunction, Request, Response } from "express";
import SkillService from "../services/skill.service";
import { sendResponse } from "../utils/sendResponse";

class SkillController {
    private skillService = new SkillService();

    getAllData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.skillService.getAllData();
            sendResponse(res, "Get All Skill", 200, result);
        } catch (error) {
            next(error);
        }
    }
}

export default SkillController;