import { NextFunction, Request, Response } from "express";
import AssessmentCertificateService from "../services/AssessmentCertificate.service";
import { AssessmentCertificateCreateSchema } from "../dto/AssessmentCertificate.dto";
import { sendResponse } from "../utils/sendResponse";

class AssessmentCertificateController {
    private assessmentCertificateService = new AssessmentCertificateService();

    createAssessmentCertificate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = AssessmentCertificateCreateSchema.parse(req.body);
            const result = await this.assessmentCertificateService.createAssessmentCertificate(payload);
            return sendResponse(res, "Assessment certificate created", 200, result);
        } catch (error) {
            next(error);
        }
    }

    getAssessmentCertificate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const result = await this.assessmentCertificateService.getAssessmentCertificate(id);
            return sendResponse(res, "Get assessment certificate", 200, result);
        } catch (error) {
            next(error);
        }
    }
}

export default AssessmentCertificateController;