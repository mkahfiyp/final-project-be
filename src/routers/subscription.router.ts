import { Router } from "express";
import SubscriptionController from "../controllers/subscription.controller";
import { verifyToken } from "../middleware/verifyToken";

export class SubscriptionRouter {
    private router: Router;
    private subscriptionController: SubscriptionController;

    constructor() {
        this.router = Router();
        this.subscriptionController = new SubscriptionController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.subscriptionController.getSubscription);
        this.router.use(verifyToken);
        this.router.post("/", this.subscriptionController.createSubscription);
        this.router.patch("/:id", this.subscriptionController.updateSubscription);
        this.router.delete("/:id", this.subscriptionController.deleteSubscription);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default SubscriptionRouter;