import { Subscription, SubscriptionCreateDTO, SubscriptionUpdateDTO } from "../dto/subscription";
import SubscriptionRepository from "../repositories/subscription.repository";

class SubscriptionService {
    private subscriptionRepository: SubscriptionRepository = new SubscriptionRepository();

    getSubscription = async () => {
        const result: Subscription[] = await this.subscriptionRepository.getSubscription();
        return result;
    }

    createSubscription = async (data: SubscriptionCreateDTO) => {
        return await this.subscriptionRepository.createSubscription(data);
    }

    updateSubscription = async (data: SubscriptionUpdateDTO) => {
        return await this.subscriptionRepository.updateSubscription(data);
    }

    deleteSubscription = async (subscription_id: number) => {
        return await this.subscriptionRepository.deleteSubscription(subscription_id);
    }
}

export default SubscriptionService;