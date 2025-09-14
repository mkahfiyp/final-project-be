import { Router } from "express";
import UserAssessmentController from "../controllers/userAssessment.controller";
import { verifyToken } from "../middleware/verifyToken";

class UserAssessmentRouter {
    private router: Router;
    private userAssessmentController: UserAssessmentController;

    constructor() {
        this.router = Router();
        this.userAssessmentController = new UserAssessmentController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(verifyToken);
        this.router.post("/", this.userAssessmentController.createUserAssessment);
        this.router.get("/", this.userAssessmentController.getUserAssessment);
        this.router.patch("/", this.userAssessmentController.updateUserAssessment);
        this.router.get("/getTime", this.userAssessmentController.getTime);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default UserAssessmentRouter;