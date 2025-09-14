import { NextFunction, Request, Response } from "express";
import UserCompanyService from "../services/userCompany.service";
import { UserCompanyCreateSchema, UserCompanyUpdateSchema } from "../dto/userCompany.dto";
import { sendResponse } from "../utils/sendResponse";

class UserCompanyController {
    private userCompanyService: UserCompanyService;

    constructor() {
        this.userCompanyService = new UserCompanyService();
    }

    createUserCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(res.locals.decript.id);
            const validatedData = UserCompanyCreateSchema.parse(req.body);

            const result = await this.userCompanyService.createUserCompany(userId, validatedData);
            sendResponse(res, "Work history created successfully", 201, result);
        } catch (error) {
            next(error);
        }
    };

    getUserCompanies = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(res.locals.decript.id);
            const result = await this.userCompanyService.getUserCompanies(userId);
            sendResponse(res, "User work history retrieved successfully", 200, result);
        } catch (error) {
            next(error);
        }
    };

    updateUserCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(res.locals.decript.id);
            const userCompanyId = Number(req.params.id);
            const validatedData = UserCompanyUpdateSchema.parse(req.body);

            const result = await this.userCompanyService.updateUserCompany(userCompanyId, userId, {
                ...validatedData,
                end_date: validatedData.end_date === null ? undefined : validatedData.end_date,
            });
            sendResponse(res, "Work history updated successfully", 200, result);
        } catch (error) {
            next(error);
        }
    };

    deleteUserCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_company_id = Number(req.params.id);

            await this.userCompanyService.deleteUserCompany(user_company_id);
            sendResponse(res, "Work history deleted successfully", 200, null);
        } catch (error) {
            next(error);
        }
    };
}

export default UserCompanyController;