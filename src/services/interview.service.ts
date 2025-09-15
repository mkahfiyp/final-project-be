import AppError from "../errors/appError";
import { InterviewInput } from "../middleware/validation/interview.validation";
import InterviewRepository from "../repositories/interview.repository";

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
    return result;
  };
}

export default InterviewService;
