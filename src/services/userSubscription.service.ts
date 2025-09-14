import { UserSubscriptionGetDTO } from "../dto/userSubscription.dto";
import UserSubscriptionRepository from "../repositories/userSubscription.repository";

class UserSubscriptionService {
    private userSubscriptionRepo: UserSubscriptionRepository = new UserSubscriptionRepository();

    getUserSubscription = async (user_id: number) => {
        const data: UserSubscriptionGetDTO[] = await this.userSubscriptionRepo.getUserSubscription(user_id);
        return data;
    }
}

export default UserSubscriptionService;