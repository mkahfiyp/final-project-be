import { NextFunction, Request, Response } from "express";
import QuestionService from "../services/question.services";
import { sendResponse } from "../utils/sendResponse";
import { CreateQuestionDTO } from "../dto/questions.dto";

class QuestionController {
    private questionService = new QuestionService;

    getDataByAssessmentId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const data = await this.questionService.getDataByAssessmentId(id);
            sendResponse(res, "Questions list", 200, data);
        } catch (error) {
            next(error)
        }
    }

    createForAssessment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return res.status(400).json({ success: false, message: "Invalid assessment id" });

            const payload = req.body as CreateQuestionDTO[];
            if (!Array.isArray(payload) || payload.length === 0) {
                return res.status(400).json({ success: false, message: "Request body must be a non-empty array of questions" });
            }

            const result = await this.questionService.createQuestionsForAssessment(id, payload);
            // createMany returns { count } — adapt message accordingly
            return sendResponse(res, "Questions created", 201, result);
        } catch (error) {
            next(error);
        }
    };
}

export default QuestionController;