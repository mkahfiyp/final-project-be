import { Router } from "express";
import JobSaveController from "../controllers/jobSave.controller";
import { verifyToken } from "../middleware/verifyToken";

class JobSaveRouter {
  private router: Router;
  private jobSaveController: JobSaveController;

  constructor() {
    this.router = Router();
    this.jobSaveController = new JobSaveController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Get all saved jobs for authenticated user
    this.router.get("/", verifyToken, this.jobSaveController.getSavedJobs);

    // Save a job
    this.router.post("/", verifyToken, this.jobSaveController.saveJob);

    // Check if job is saved
    this.router.get("/check/:jobId", verifyToken, this.jobSaveController.checkJobSaved);

    // Unsave a job
    this.router.delete("/:jobId", verifyToken, this.jobSaveController.unsaveJob);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default JobSaveRouter;
