import { Router } from "express";
import EducationController from "../controllers/education.controller";
import { verifyToken } from "../middleware/verifyToken";

class EducationRouter {
  private router: Router;
  private educationController: EducationController;

  constructor() {
    this.router = Router();
    this.educationController = new EducationController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Get all educations for authenticated user
    this.router.get("/", verifyToken, this.educationController.getEducations);

    // Create new education
    this.router.post("/", verifyToken, this.educationController.createEducation);

    // Update education by ID
    this.router.put("/:id", verifyToken, this.educationController.updateEducation);

    // Delete education by ID
    this.router.delete("/:id", verifyToken, this.educationController.deleteEducation);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default EducationRouter;
