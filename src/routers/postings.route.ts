import { Router } from "express";
import PostingsController from "../controllers/postings.controller";
import { verifyToken } from "../middleware/verifyToken";
import { validatorRole } from "../middleware/validatorRole";
import { Role } from "../../prisma/generated/client";
import { validator } from "../middleware/validation/validator";
import { schemaJobsInput } from "../middleware/validation/postings.validation";

class PostingsRouter {
  private route: Router;
  private postingsController: PostingsController;
  constructor() {
    this.route = Router();
    this.postingsController = new PostingsController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    // Public routes (no authentication required)
    this.route.get("/", this.postingsController.getAllJobPostings);

    // Protected routes (authentication required)
    this.route.use(verifyToken);
    this.route.get(
      "/get-detail/:slug",
      this.postingsController.getDetailJobPosting
    );
    this.route.get(
      "/applicant_id/:job_id",
      this.postingsController.getApplicantId
    );
    this.route.use(validatorRole(Role.COMPANY));
    this.route.get("/get-general-data", this.postingsController.getGenralData);
    this.route.get("/get-skill-list", this.postingsController.getSkillList);
    this.route.post(
      "/create",
      validator(schemaJobsInput),
      this.postingsController.createJobPosting
    );
    this.route.get("/get", this.postingsController.getMyJobList);
    this.route.patch(
      "/update/:slug",
      validator(schemaJobsInput),
      this.postingsController.updateJobPostring
    );
    this.route.delete(
      "/delete/:slug",
      this.postingsController.deleteJobPostring
    );
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default PostingsRouter;
