import { NextFunction, Request, Response } from "express";
import UserSubscriptionService from "../services/userSubscription.service";
import { UserSubscriptionGetDTO, UserSubscriptionScheduleDTO, UserSubscriptionsGetDTO } from "../dto/userSubscription.dto";
import { sendResponse } from "../utils/sendResponse";
import { UploadApiResponse } from "cloudinary";
import { cloudinaryUpload } from "../config/coudinary";
import { transport } from "../config/nodemailer";
import { subscriptionReminderTemplate } from "../templates/subscriptionReminder.template";

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
            let upload: UploadApiResponse | undefined;
            if (req.file) {
                upload = await cloudinaryUpload(req.file);
            }
            const user_subscription_id: number = Number(req.params.id);
            const result: UserSubscriptionGetDTO = await this.userSubscriptionService.updateUserSubscription({ ...req.body, user_subscription_id, proof_url: upload?.secure_url });
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

    scheduleReminder = async () => {
        try {
            const result: UserSubscriptionScheduleDTO[] = await this.userSubscriptionService.scheduleReminder();
            for (const item of result) {
                const endDate = new Date(item.end_date);
                const now = new Date();

                const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                const diffInDays = (endDateOnly.getTime() - nowOnly.getTime()) / (1000 * 60 * 60 * 24);

                if (diffInDays === 1) {
                    const { subject, html, text } = subscriptionReminderTemplate(
                        item.user.name,
                        new Date(item.end_date)
                    );
                    await transport.sendMail({
                        from: process.env.MAINSENDER,
                        to: item.user.email,
                        subject,
                        html,
                        text,
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserSubscriptionController;