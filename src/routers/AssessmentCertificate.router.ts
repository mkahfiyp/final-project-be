import { Router } from "express";
import AssessmentCertificateController from "../controllers/AssessmentCertificate.controller";
import { verifyToken } from "../middleware/verifyToken";

class AssessmentCertificateRouter {
    private router: Router;
    private assessmentCertificateController: AssessmentCertificateController;

    constructor() {
        this.router = Router();
        this.assessmentCertificateController = new AssessmentCertificateController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(verifyToken);
        this.router.post("/", this.assessmentCertificateController.createAssessmentCertificate);
        this.router.get("/:id", this.assessmentCertificateController.getAssessmentCertificate);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default AssessmentCertificateRouter;