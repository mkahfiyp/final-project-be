import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import AnalyticController from "../controllers/analytic.controller";
import { validatorRole } from "../middleware/validatorRole";
import { Role } from "../../prisma/generated/client";

class AnalyticRouter {
  private router: Router;
  private analyticController: AnalyticController;

  constructor() {
    this.router = Router();
    this.analyticController = new AnalyticController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(verifyToken, validatorRole(Role.COMPANY));
    this.router.get(
      "/user-demographics",
      this.analyticController.getDemographics
    );
    this.router.get("/salary-trends", this.analyticController.getSalaryTrends);
    this.router.get("/most-jobtype", this.analyticController.getMostJobType);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default AnalyticRouter;
