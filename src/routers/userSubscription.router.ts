import { Router, Request, Response, NextFunction } from 'express';
import UserSubscriptionController from '../controllers/userSubscription.controller';
import { verifyToken } from '../middleware/verifyToken';

export class UserSubscriptionRouter {
    private router: Router;
    private userSubscriptionController: UserSubscriptionController;

    constructor() {
        this.router = Router();
        this.userSubscriptionController = new UserSubscriptionController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(verifyToken);
        this.router.get('/', this.userSubscriptionController.getUserSubscription);
        this.router.get('/user-subscription', this.userSubscriptionController.getUserSubscriptions);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default UserSubscriptionRouter;