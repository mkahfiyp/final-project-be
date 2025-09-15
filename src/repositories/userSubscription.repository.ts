import { prisma } from "../config/prisma"
import { UserSubscriptionGetDTO, UserSubscriptionsGetDTO } from "../dto/userSubscription.dto";

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
}

export default UserSubscriptionRepository;