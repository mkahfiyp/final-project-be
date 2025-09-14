import { prisma } from "../config/prisma"
import { UserSubscriptionGetDTO } from "../dto/userSubscription.dto";

class UserSubscriptionRepository {
    getUserSubscription = async (user_id: number) => {
        const data: UserSubscriptionGetDTO[] = await prisma.userSubscriptions.findMany({ where: { user_id, end_date: { gte: new Date() } } });
        return data;
    }
}

export default UserSubscriptionRepository;