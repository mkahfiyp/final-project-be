import z from "zod";

export const SubscriptionSchema = z.object({
    subscription_id: z.number(),
    name: z.string().min(1),
    price: z.number().int(),
    createAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const SubscriptionCreateSchema = z.object({
    name: z.string().min(1),
    price: z.number().int(),
});

export type SubscriptionCreateDTO = z.infer<typeof SubscriptionCreateSchema>;

export const SubscriptionUpdateSchema = z.object({
    subscription_id: z.number(),
    name: z.string().min(1),
    price: z.number().int(),
});

export type SubscriptionUpdateDTO = z.infer<typeof SubscriptionUpdateSchema>;