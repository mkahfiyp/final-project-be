import { NextFunction, Request, Response } from "express";
import UserAssessmentService from "../services/userAssessment.service";
import { UserAssessmentCreateSchema, UserAssessmentUpdateDTO, UserAssessmentUpdateSchema } from "../dto/userAssessment.dto";
import { sendResponse } from "../utils/sendResponse";

class UserAssessmentController {
    private UserAssessmentService = new UserAssessmentService();

    getUserAssessment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = Number(res.locals.decript.id);
            const result = await this.UserAssessmentService.getUserAssessment(user_id);
            return sendResponse(res, "Get user assessment", 200, result);
        } catch (error) {
            next(error);
        }
    }

    getTime = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const time = await this.UserAssessmentService.getTime();
            return sendResponse(res, "Get time", 200, time);
        } catch (error) {
            next(error);
        }
    }

    createUserAssessment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = Number(res.locals.decript.id);
            const payload = UserAssessmentCreateSchema.parse({ ...req.body, user_id });
            const result = await this.UserAssessmentService.createUserAssessment(payload)
            return sendResponse(res, "User Assessment Created", 200, result);
        } catch (error) {
            next(error)
        }
    }

    updateUserAssessment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = UserAssessmentUpdateSchema.parse(req.body);
            const result = await this.UserAssessmentService.updateUserAssessment(payload);
            return sendResponse(res, "User assessment Updated!", 200, result);
        } catch (error) {
            next(error);
        }
    }
}

export default UserAssessmentController;