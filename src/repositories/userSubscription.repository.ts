import { prisma } from "../config/prisma"
import { UserSubscriptionCreateDTO, UserSubscriptionGetDTO, UserSubscriptionsGetDTO, UserSubscriptionUpdateDTO } from "../dto/userSubscription.dto";

class UserSubscriptionRepository {
    getUserSubscription = async (user_id: number) => {
        const data: UserSubscriptionGetDTO[] = await prisma.userSubscriptions.findMany({ where: { user_id, end_date: { gte: new Date() } } });
        return data;
    }

    getUserSubscriptions = async () => {
        const data = await prisma.userSubscriptions.findMany({
            include: {
                subscription: true,
            }
        });

        return data.map(item => ({ userSubscriptionSchema: item, subscription: item.subscription })) as UserSubscriptionsGetDTO[];
    }

    updateUserSubscription = async (data: UserSubscriptionUpdateDTO) => {
        const result: UserSubscriptionGetDTO = await prisma.userSubscriptions.update({ where: { user_subscription_id: data.user_subscription_id }, data });
        return result;
    }

    getUserSubscriptionActive = async (user_id: number) => {
        const data = await prisma.userSubscriptions.findFirst({
            where: {
                end_date: { gte: new Date() },
                user_id,
                payment_status: "APPROVED",
            }, include: {
                subscription: true,
                user: true,
            }, orderBy: {
                end_date: "desc",
            }
        });
        return data;
    }

    getUserSubscriptionHistory = async (user_id: number) => {
        const data = await prisma.userSubscriptions.findMany({
            where: {
                user_id,
            }, include: {
                subscription: true,
                user: true,
            }, orderBy: {
                end_date: "desc",
            },
        });
        return data;
    }

    createUserSubscription = async (data: UserSubscriptionCreateDTO) => {
        const result = await prisma.userSubscriptions.create({ data });
        return result;
    }
}

export default UserSubscriptionRepository;