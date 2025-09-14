import { Router } from "express";
import ReviewCompanyController from "../controllers/reviewCompany.controller";
import { verifyToken } from "../middleware/verifyToken";

class ReviewCompanyRouter {
  private router: Router;
  private reviewCompanyController: ReviewCompanyController;

  constructor() {
    this.router = Router();
    this.reviewCompanyController = new ReviewCompanyController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", verifyToken, this.reviewCompanyController.createReview);

    this.router.get(
      "/",
      this.reviewCompanyController.getReviewsByCompanyId
    );

    this.router.patch("/:reviewId", verifyToken, this.reviewCompanyController.updateReview);

    this.router.delete("/:reviewId", verifyToken, this.reviewCompanyController.deleteReview);
  }

  getRouter(): Router {
    return this.router;
  }
}

export default ReviewCompanyRouter;