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

    updateUserSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_subscription_id: number = Number(req.params.id);
            const result: UserSubscriptionGetDTO = await this.userSubscriptionService.updateUserSubscription({ ...req.body, user_subscription_id });
            sendResponse(res, "Update data user subscription", 200, result);
        } catch (error) {
            next(error);
        }
    }

    getUserSubscriptionActive = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id: number = Number(res.locals.decript.id);
            const data = await this.userSubscriptionService.getUserSubscriptionActive(user_id);
            sendResponse(res, "Get data user subscription active", 200, data);
        } catch (error) {
            next(error);
        }
    }

    getUserSubscriptionHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id: number = Number(res.locals.decript.id);
            const result = await this.userSubscriptionService.getUserSubscriptionHistory(user_id);
            sendResponse(res, "Get history user subscription", 200, result);
        } catch (error) {
            next(error);
        }
    }

    createUserSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id: number = Number(res.locals.decript.id);
            const result = await this.userSubscriptionService.createUserSubscription({ user_id, ...req.body });
            sendResponse(res, "Get history user subscription", 200, result);
        } catch (error) {
            next(error);
        }
    }
}

export default UserSubscriptionController;