import { NextFunction, Request, Response } from "express";
import { Subscription, SubscriptionCreateDTO, SubscriptionCreateSchema, SubscriptionUpdateDTO, SubscriptionUpdateSchema } from "../dto/subscription";
import SubscriptionService from "../services/subscription.service";
import { sendResponse } from "../utils/sendResponse";

class SubscriptionController {
    private subscriptionService: SubscriptionService = new SubscriptionService();

    getSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: Subscription[] = await this.subscriptionService.getSubscription();
            sendResponse(res, "Get all data subscription", 200, result);
        } catch (error) {
            next(error);
        }
    }

    createSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedReq = SubscriptionCreateSchema.safeParse(req.body);
            if (!parsedReq.success) {
                return sendResponse(res, "Invalid input data", 400, parsedReq.error);
            }
            const parsed: SubscriptionCreateDTO = parsedReq.data;
            const result: Subscription = await this.subscriptionService.createSubscription(parsed);
            sendResponse(res, "Subscription created successfully", 201, result);
        } catch (error) {
            next(error);
        }
    }

    updateSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subscription_id = Number(req.params.id);
            const parsed: SubscriptionUpdateDTO = { ...req.body, subscription_id };

            const validatedData = SubscriptionUpdateSchema.safeParse(parsed);
            if (!validatedData.success) {
                return sendResponse(res, "Validation error", 400, validatedData.error.format());
            }
            const result: Subscription = await this.subscriptionService.updateSubscription(validatedData.data);
            sendResponse(res, "Subscription updated", 200, result);
        } catch (error) {
            next(error);
        }
    }

    deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subscription_id = Number(req.params.id);
            const result = await this.subscriptionService.deleteSubscription(subscription_id);
            sendResponse(res, "Subscription Deleted", 200, result);
        } catch (error) {
            next(error);
        }
    }
}

export default SubscriptionController;