import { NextFunction, Request, Response } from "express";
import InterviewService from "../services/interview.service";
import { sendResponse } from "../utils/sendResponse";

class InterviewController {
  private interviewService = new InterviewService();

  getAllInterviewFormCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.interviewService.getAllInterviewForCompany(
        res.locals.decript.id
      );
      sendResponse(res, "success", 200, result);
    } catch (error) {
      next(error);
    }
  };

  createInterview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.interviewService.createInterview(res.locals.data);
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
  getInterviewShedule = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.interviewService.getInterviewShedule(
        Number(req.params.application_id),
        res.locals.decript.id
      );
      sendResponse(res, "success", 200, result);
    } catch (error) {
      next(error);
    }
  };
  updateInterview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.interviewService.updateInterview(
        Number(req.params.interview_id),
        res.locals.data
      );
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
  scheduleReminder = async () => {
    try {
      await this.interviewService.ScheduleReminder();
    } catch (error) {}
  };
}

export default InterviewController;
