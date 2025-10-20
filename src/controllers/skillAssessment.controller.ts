import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import SkillService from "../services/skillAssessment.services";
import { SkillAssessmentDTO } from "../dto/skillAssessment.dto";

class SkillAssessmentController {
    private skillServices = new SkillService();

    getList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const items = await this.skillServices.getAllData();
            sendResponse(res, "List skill assessments", 200, items);
        } catch (error) {
            next(error);
        }
    }

    getDataById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const items: SkillAssessmentDTO[] = await this.skillServices.getDataById(Number(req.params.assessment_id));
            sendResponse(res, "Skill assessment detail", 200, items);
        } catch (error) {
            next(error);
        }
    }

    createSkill = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createdSkill = await this.skillServices.createSkill(req.body);
            sendResponse(res, "Skill created successfully", 201, createdSkill);
        } catch (error) {
            next(error);
        }
    }

    deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const deleteSkill = await this.skillServices.deleteSkill(id);
            sendResponse(res, "Skill deleted successfully", 200, deleteSkill);
        } catch (error) {
            next(error)
        }
    }

    updateSkill = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const updateSkill = await this.skillServices.updateSkill(id, req.body);
            sendResponse(res, "Skill updated successfully", 200, updateSkill);
        } catch (error) {
            next(error);
        }
    }
}

export default SkillAssessmentController;