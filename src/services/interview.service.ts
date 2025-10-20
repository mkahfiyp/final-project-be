import { transport } from "../config/nodemailer";
import AppError from "../errors/appError";
import { InterviewInput } from "../middleware/validation/interview.validation";
import InterviewRepository from "../repositories/interview.repository";
import { interviewScheduleTemplate } from "../templates/interviewSchedule.template";
import { scheduleReminderMail } from "../templates/scheduleReminder.template";

class InterviewService {
  private interviewRepository = new InterviewRepository();

  getAllInterviewForCompany = async (user_id: number) => {
    const company = await this.interviewRepository.getCompanyId(user_id);
    if (!company?.companies?.company_id) {
      throw new AppError("faild get company id", 400);
    }
    const result = await this.interviewRepository.getAllInterviewForCompany(
      company?.companies?.company_id
    );
    return result;
  };
  createInterview = async (data: InterviewInput) => {
    const result = await this.interviewRepository.createInterview(data);
    await this.interviewRepository.updateStatus(result.application_id);
    if (!result) {
      throw new AppError("faild create interview", 500);
    }
    const htmlPelamar = interviewScheduleTemplate(
      result.application.Users?.name || "",
      `${process.env.FE_URL}/images/logo.png`,
      result.application.Jobs?.title || "",
      result.location || "",
      result.startDate,
      result.endDate,
      result.note
    );
    await transport.sendMail({
      from: process.env.MAILSENDER,
      to: result.application.Users?.email,
      subject: `Schedule Interview, ${result.application.Users?.name}`,
      html: htmlPelamar,
    });
    return result;
  };
  getInterviewShedule = async (application_id: number, user_id: number) => {
    const result = await this.interviewRepository.getInterviewShedule(
      application_id
    );
    if (!result) {
      throw new AppError("interview not exist", 400);
    }
    const company = await this.interviewRepository.getCompanyId(user_id);
    if (!company?.companies?.company_id) {
      throw new AppError("faild get company id", 400);
    }
    const all = await this.interviewRepository.getAllInterviewForCompany(
      company?.companies?.company_id
    );
    const payload = all.filter((a) => a.interview_id !== result.interview_id);

    return { edit: result, all: payload };
  };
  updateInterview = async (interview_id: number, data: InterviewInput) => {
    const result = await this.interviewRepository.updateInterview(
      interview_id,
      data
    );
    return result;
  };
  ScheduleReminder = async () => {
    const result = await this.interviewRepository.getAllInterviewSchedule();
    if (result.length === 0) return;
    for (const interview of result) {
      //to pelamar
      const htmlPelamar = scheduleReminderMail(
        interview.application.Users?.name || "",
        `${process.env.FE_URL}/images/logo.png`,
        interview.note,
        interview.location || "",
        interview.startDate,
        interview.endDate
      );
      await transport.sendMail({
        from: process.env.MAILSENDER,
        to: interview.application.Users?.email,
        subject: `Reminder: Your Interview Tomorrow, ${interview.application.Users?.name}`,
        html: htmlPelamar,
      });

      //to company
      const htmlCompany = scheduleReminderMail(
        interview.application.Jobs?.Companies?.name || "",
        `${process.env.FE_URL}/images/logo.png`,
        interview.note,
        interview.location || "",
        interview.startDate,
        interview.endDate
      );
      await transport.sendMail({
        from: process.env.MAILSENDER,
        to: interview.application.Jobs?.Companies?.email,
        subject: `Reminder: Your Interview Tomorrow, ${interview.application.Jobs?.Companies?.name}`,
        html: htmlCompany,
      });
    }
  };
}

export default InterviewService;
