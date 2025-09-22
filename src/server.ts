import { CronJob } from "cron";
import InterviewController from "./controllers/interview.controller";
import UserSubscriptionController from "./controllers/userSubscription.controller";

const interviewController = new InterviewController();
const userSubscriptionController = new UserSubscriptionController();
export const job = new CronJob(
  "0 7 * * *",
  async () => {
    await interviewController.scheduleReminder();
  },
  null,
  true,
  "Asia/Jakarta"
);

export const subscription = new CronJob(
  "0 0 * * *",
  async () => {
    await userSubscriptionController.scheduleReminder();
  },
  null,
  true,
  "Asia/Jakarta"
);
