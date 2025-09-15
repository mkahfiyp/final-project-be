import { NextFunction, Request, response, Response } from "express";
import UserSubscriptionService from "../services/userSubscription.service";
import { UserSubscriptionGetDTO, UserSubscriptionsGetDTO } from "../dto/userSubscription.dto";
import { sendResponse } from "../utils/sendResponse";

class UserSubscriptionController {
    private userSubscriptionService: UserSubscriptionService = new UserSubscriptionService();

    getUserSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id: number = Number(res.locals.decript.id);
            const data: UserSubscriptionGetDTO[] = await this.userSubscriptionService.getUserSubscription(user_id);
            sendResponse(res, "Get data user subscription", 200, data);
        } catch (error) {
            next(error);
        }
    }

    getUserSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: UserSubscriptionsGetDTO[] = await this.userSubscriptionService.getUserSubscriptions();
            sendResponse(res, "Get data user subscriptions", 200, data);
        } catch (error) {
            next(error);
        }
    }
}

export default UserSubscriptionController;