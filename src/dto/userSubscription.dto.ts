import z from "zod";
import { SubscriptionSchema } from "./subscription";
import { PaymentStatus } from "../../prisma/generated/client";

export const UserSubscriptionSchema = z.object({
    user_subscription_id: z.number(),
    user_id: z.number(),
    subscription_id: z.number(),
    start_date: z.date(),
    end_date: z.date(),
    createAt: z.date().optional(),
    updatedAt: z.date().optional(),
    payment_status: z.enum(PaymentStatus),
    proof_url: z.string().optional().nullable(),
});

export type UserSubscriptionGetDTO = z.infer<typeof UserSubscriptionSchema>;

export const UserSubscriptionsSchema = z.object({
    userSubscriptionSchema: UserSubscriptionSchema,
    subscription: SubscriptionSchema,
});

export type UserSubscriptionsGetDTO = z.infer<typeof UserSubscriptionsSchema>;

export const UserSubscriptionUpdateShcema = z.object({
    user_subscription_id: z.number(),
    user_id: z.number().optional(),
    subscription_id: z.number().optional(),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    paymentStatus: z.enum(PaymentStatus),
});

export type UserSubscriptionUpdateDTO = z.infer<typeof UserSubscriptionUpdateShcema>;

export const UserSubscriptionCrateShcema = z.object({
    user_id: z.number(),
    subscription_id: z.number(),
    end_date: z.date(),
});

export type UserSubscriptionCreateDTO = z.infer<typeof UserSubscriptionCrateShcema>;

const UserSchema = z.object({
    user_id: z.number(),
    username: z.string(),
    email: z.string(),
    name: z.string(),
})

export const UserSubscriptionScheduleSchema = UserSubscriptionSchema.extend({
    subscription: SubscriptionSchema,
    user: UserSchema,
})

export type UserSubscriptionScheduleDTO = z.infer<typeof UserSubscriptionScheduleSchema>