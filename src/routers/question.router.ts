import { Router } from "express";
import QuestionController from "../controllers/question.controller";

class QuestionRouter {
    private route: Router;
    private questionController: QuestionController;

    constructor() {
        this.route = Router();
        this.questionController = new QuestionController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.route.get("/:id", this.questionController.getDataByAssessmentId);
        this.route.post("/:id", this.questionController.createForAssessment);
    }

    public getRouter(): Router {
        return this.route;
    }
}

export default QuestionRouter;