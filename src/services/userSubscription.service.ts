import { UserSubscriptionCreateDTO, UserSubscriptionGetDTO, UserSubscriptionScheduleDTO, UserSubscriptionsGetDTO, UserSubscriptionUpdateDTO } from "../dto/userSubscription.dto";
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

    updateUserSubscription = async (data: UserSubscriptionUpdateDTO) => {
        const result: UserSubscriptionGetDTO = await this.userSubscriptionRepo.updateUserSubscription(data);
        return result;
    }

    getUserSubscriptionActive = async (user_id: number) => {
        const result = await this.userSubscriptionRepo.getUserSubscriptionActive(user_id);
        return result;
    }

    getUserSubscriptionHistory = async (user_id: number) => {
        const result = await this.userSubscriptionRepo.getUserSubscriptionHistory(user_id);
        return result;
    }

    createUserSubscription = async (data: UserSubscriptionCreateDTO) => {
        const result = await this.userSubscriptionRepo.createUserSubscription(data);
        return result;
    }

    scheduleReminder = async () => {
        const result: UserSubscriptionScheduleDTO[] = await this.userSubscriptionRepo.scheduleReminder();
        return result;
    }
}

export default UserSubscriptionService;