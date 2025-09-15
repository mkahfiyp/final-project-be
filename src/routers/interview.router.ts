import { Router } from "express";
import InterviewController from "../controllers/interview.controller";
import { verifyToken } from "../middleware/verifyToken";
import { validatorRole } from "../middleware/validatorRole";
import { Role } from "../../prisma/generated/client";
import { validator } from "../middleware/validation/validator";
import { schemaInterviewInput } from "../middleware/validation/interview.validation";

class InterviewRouter {
  private router: Router;
  private interviewController: InterviewController;

  constructor() {
    this.router = Router();
    this.interviewController = new InterviewController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(verifyToken);
    this.router.get(
      "/company/all",
      validatorRole(Role.COMPANY),
      this.interviewController.getAllInterviewFormCompany
    );
    this.router.post(
      "/create",
      validator(schemaInterviewInput),
      validatorRole(Role.COMPANY),
      this.interviewController.createInterview
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default InterviewRouter;
