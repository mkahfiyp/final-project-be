import { Router } from "express";
import ApplicationController from "../controllers/application.controller";
import { verifyToken } from "../middleware/verifyToken";
import { validatorRole } from "../middleware/validatorRole";
import { Role } from "../../prisma/generated/client";

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
    this.router.get(
      "/my",
      verifyToken,
      this.applicationController.getMyApplications
    );

    this.router.get(
      "/company/list/:slug",
      verifyToken,
      validatorRole(Role.COMPANY),
      this.applicationController.getJobApplicantList
    );
    this.router.get(
      "/detail/:application_id",
      verifyToken,
      validatorRole(Role.COMPANY),
      this.applicationController.getDetailApplicant
    );

    // Get application detail by ID
    this.router.get(
      "/:id",
      verifyToken,
      this.applicationController.getApplicationDetail
    );

    // Apply for a job
    this.router.post("/", verifyToken, this.applicationController.applyForJob);

    // Update application status (company only)
    this.router.put(
      "/:id/status",
      verifyToken,
      this.applicationController.updateApplicationStatus
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default ApplicationRouter;
