import { Router } from "express";
import ApplicationController from "../controllers/application.controller";
import { verifyToken } from "../middleware/verifyToken";
import { validatorRole } from "../middleware/validatorRole";
import { Role } from "../../prisma/generated/client";
import { validator } from "../middleware/validation/validator";
import { createApplicationSchema } from "../middleware/validation/application.validation";
import { uploadMemory } from "../middleware/uploader";

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

    // Route untuk user apply job
    this.router.post(
      "/",
      validatorRole(Role.USER),
      uploadMemory().single("cv"),
      validator(createApplicationSchema),
      this.applicationController.createApplication
    );

    // Route untuk user melihat aplikasi mereka
    this.router.get(
      "/my-applications",
      validatorRole(Role.USER),
      this.applicationController.getUserApplications
    );

    // Route untuk user melihat aplikasi mereka dengan pagination
    this.router.get(
      "/user",
      validatorRole(Role.USER),
      this.applicationController.getUserApplicationsPaginated
    );

    // Routes untuk company
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
