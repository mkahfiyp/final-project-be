import { Router, Request, Response, NextFunction } from 'express';
import UserSubscriptionController from '../controllers/userSubscription.controller';
import { verifyToken } from '../middleware/verifyToken';
import { uploadMemory } from '../middleware/uploader';

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
        this.router.patch('/:id', uploadMemory().single("proof"), this.userSubscriptionController.updateUserSubscription);
        this.router.get('/user-subscription-active', this.userSubscriptionController.getUserSubscriptionActive);
        this.router.get('/user-subscription-history', this.userSubscriptionController.getUserSubscriptionHistory);
        this.router.post('/', this.userSubscriptionController.createUserSubscription);
        // this.router.get("/tes/tes/tes", this.userSubscriptionController.scheduleReminder);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default UserSubscriptionRouter;