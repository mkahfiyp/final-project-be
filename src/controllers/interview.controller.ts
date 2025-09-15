import { NextFunction, Request, Response } from "express";
import InterviewService from "../services/interview.service";
import AppError from "../errors/appError";
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
}

export default InterviewController;
