import { prisma } from "../config/prisma"
import { Subscription, SubscriptionCreateDTO, SubscriptionUpdateDTO } from "../dto/subscription"

class SubscriptionRepository {
    getSubscription = async () => {
        const result: Subscription[] = await prisma.subscriptions.findMany({ orderBy: { createAt: "asc" } });
        return result
    }

    createSubscription = async (data: SubscriptionCreateDTO) => {
        return await prisma.subscriptions.create({ data });
    }

    updateSubscription = async (data: SubscriptionUpdateDTO) => {
        const { subscription_id, ...updateData } = data;
        return await prisma.subscriptions.update({ where: { subscription_id }, data: updateData });
    }

    deleteSubscription = async (subscription_id: number) => {
        return await prisma.subscriptions.update({ where: { subscription_id }, data: { deletedAt: new Date() } });
    }
}

export default SubscriptionRepository;