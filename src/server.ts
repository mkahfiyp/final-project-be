import { CronJob } from "cron";
import InterviewController from "./controllers/interview.controller";

const interviewController = new InterviewController();
export const job = new CronJob(
  "0 7 * * *",
  async () => {
    await interviewController.scheduleReminder();
  },
  null,
  true,
  "Asia/Jakarta"
);
