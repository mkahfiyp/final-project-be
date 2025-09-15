import { UserSubscriptionGetDTO, UserSubscriptionsGetDTO } from "../dto/userSubscription.dto";
import UserSubscriptionRepository from "../repositories/userSubscription.repository";

class UserSubscriptionService {
    private userSubscriptionRepo: UserSubscriptionRepository = new UserSubscriptionRepository();

    getUserSubscription = async (user_id: number) => {
        const data: UserSubscriptionGetDTO[] = await this.userSubscriptionRepo.getUserSubscription(user_id);
        return data;
    }

    getUserSubscriptions = async () => {
        const data: UserSubscriptionsGetDTO[] = await this.userSubscriptionRepo.getUserSubscriptions();
        return data;
    }
}

export default UserSubscriptionService;