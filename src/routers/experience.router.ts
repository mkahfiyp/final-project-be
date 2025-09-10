import { Router } from "express";
import ExperienceController from "../controllers/experience.controller";
import { verifyToken } from "../middleware/verifyToken";

class ExperienceRouter {
  private router: Router;
  private experienceController: ExperienceController;

  constructor() {
    this.router = Router();
    this.experienceController = new ExperienceController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Get all experiences for authenticated user
    this.router.get("/", verifyToken, this.experienceController.getExperiences);

    // Create new experience
    this.router.post("/", verifyToken, this.experienceController.createExperience);

    // Update experience by ID
    this.router.put("/:id", verifyToken, this.experienceController.updateExperience);

    // Delete experience by ID
    this.router.delete("/:id", verifyToken, this.experienceController.deleteExperience);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default ExperienceRouter;
