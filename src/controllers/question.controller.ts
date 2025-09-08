import { NextFunction, Request, Response } from "express";
import QuestionService from "../services/question.services";
import { sendResponse } from "../utils/sendResponse";
import { AssessmentQuestionsDto, AssessmentQuestionInput } from "../dto/questions.dto";

class QuestionController {
    private questionService = new QuestionService;

    getDataByAssessmentId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const assessment_id = Number(req.params.id);
            const data = await this.questionService.getDataByAssessmentId(assessment_id);
            sendResponse(res, "Questions list", 200, data);
        } catch (error) {
            next(error)
        }
    }

    createQuestionsForAssessment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const assessment_id = Number(req.params.id);
            if (Number.isNaN(assessment_id)) return res.status(400).json({ success: false, message: "Invalid assessment id" });

            const payload = req.body as AssessmentQuestionInput[];
            if (!Array.isArray(payload) || payload.length === 0) {
                return res.status(400).json({ success: false, message: "Request body must be a non-empty array of questions" });
            }

            const result = await this.questionService.createQuestionsForAssessment(assessment_id, payload);
            return sendResponse(res, "Questions created", 201, result);
        } catch (error) {
            next(error);
        }
    };

    deleteAllQuestionsByAssessmentId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const assessment_id = Number(req.params.id);
            const result = await this.questionService.deleteAllQuestionsByAssessmentId(assessment_id);
            return sendResponse(res, "Questions deleted", 200, result);
        } catch (error) {
            next(error);
        }
    }

    updateAssessmentQuestions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const assessment_id = Number(req.params.id);

            const parseResult = AssessmentQuestionsDto.safeParse(req.body);
            if (!parseResult.success) {
                return sendResponse(res, "Data not valid", 400);
            }

            const questions: AssessmentQuestionInput[] = parseResult.data;

            const results = await this.questionService.updateQuestions(assessment_id, questions);

            return sendResponse(res, "Questions updated", 200, results);
        } catch (error) {
            next(error);
        }
    };
}

export default QuestionController;