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
    this.router.use(verifyToken);
    this.router.get(
      "/company/list/:slug",
      validatorRole(Role.COMPANY),
      this.applicationController.getJobApplicantList
    );
    this.router.get(
      "/detail/:application_id",
      validatorRole(Role.COMPANY),
      this.applicationController.getDetailApplicant
    );
    this.router.patch(
      "/update/:status/:application_id",
      validatorRole(Role.COMPANY),
      this.applicationController.updateStatus
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default ApplicationRouter;
