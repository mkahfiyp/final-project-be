import { prisma } from "../config/prisma";
import {
  UserSubscriptionCreateDTO,
  UserSubscriptionGetDTO,
  UserSubscriptionScheduleDTO,
  UserSubscriptionsGetDTO,
  UserSubscriptionUpdateDTO,
} from "../dto/userSubscription.dto";

class UserSubscriptionRepository {
  getUserSubscription = async (user_id: number) => {
    const data: UserSubscriptionGetDTO[] =
      await prisma.userSubscriptions.findMany({
        where: { user_id, end_date: { gte: new Date() } },
        orderBy: {
          createAt: "desc",
        },
      });
    return data;
  };

  getUserSubscriptions = async () => {
    const data = await prisma.userSubscriptions.findMany({
      include: {
        subscription: true,
      },
      orderBy: { createAt: "desc" },
    });

    return data.map((item) => ({
      userSubscriptionSchema: item,
      subscription: item.subscription,
    })) as UserSubscriptionsGetDTO[];
  };

  updateUserSubscription = async (data: UserSubscriptionUpdateDTO) => {
    const result: UserSubscriptionGetDTO =
      await prisma.userSubscriptions.update({
        where: { user_subscription_id: data.user_subscription_id },
        data,
      });
    return result;
  };

  getUserSubscriptionActive = async (user_id: number) => {
    const data = await prisma.userSubscriptions.findFirst({
      where: {
        end_date: { gte: new Date() },
        user_id,
        // payment_status: "APPROVED",
      },
      include: {
        subscription: true,
        user: true,
      },
      orderBy: {
        end_date: "desc",
      },
    });
    return data;
  };

  getUserSubscriptionHistory = async (user_id: number) => {
    const data = await prisma.userSubscriptions.findMany({
      where: {
        user_id,
      },
      include: {
        subscription: true,
        user: true,
      },
      orderBy: {
        end_date: "desc",
      },
    });
    return data;
  };

  createUserSubscription = async (data: UserSubscriptionCreateDTO) => {
    const result = await prisma.userSubscriptions.create({ data });
    return result;
  };

  scheduleReminder = async () => {
    const result = await prisma.userSubscriptions.findMany({
      include: {
        subscription: true,
        user: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });

    const safe = result.map(({ user, ...rest }) => ({
      ...rest,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
    }));

    return safe;
  };
}

export default UserSubscriptionRepository;
