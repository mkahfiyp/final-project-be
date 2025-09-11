import { Router } from "express";
import ApplicationController from "../controllers/application.controller";
import { verifyToken } from "../middleware/verifyToken";

class ApplicationRouter {
  private router: Router;
  private applicationController: ApplicationController;

  constructor() {
    this.router = Router();
    this.applicationController = new ApplicationController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Get my applications (for users)
    this.router.get("/my", verifyToken, this.applicationController.getMyApplications);

    // Get company applications (for companies)
    this.router.get("/company", verifyToken, this.applicationController.getCompanyApplications);

    // Get application detail by ID
    this.router.get("/:id", verifyToken, this.applicationController.getApplicationDetail);

    // Apply for a job
    this.router.post("/", verifyToken, this.applicationController.applyForJob);

    // Update application status (company only)
    this.router.put("/:id/status", verifyToken, this.applicationController.updateApplicationStatus);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default ApplicationRouter;
