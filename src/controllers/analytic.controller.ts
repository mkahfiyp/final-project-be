import { NextFunction, Request, Response } from "express";
import AnalyticService from "../services/analytic.service";
import { sendResponse } from "../utils/sendResponse";
import { JobType } from "../../prisma/generated/client";

class AnalyticController {
  private analyticService = new AnalyticService();

  getDemographics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gender = req.query.gender as "male" | "female" | undefined;
      const range = req.query.range as
        | "7d"
        | "month"
        | "year"
        | "all"
        | undefined;
      console.log(range);
      const data = await this.analyticService.getUserDemographics({
        gender,
        range,
      });

      sendResponse(res, "success", 200, data);
    } catch (error) {
      next(error);
    }
  };
  getSalaryTrends = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobType = req.query.jobType as JobType | "all";
      const range = req.query.range as
        | "7d"
        | "month"
        | "year"
        | "all"
        | undefined;
      const city = req.query.city as string | "all";
      const data = await this.analyticService.getSalaryTrends({
        jobType,
        range,
        city,
      });
      sendResponse(res, "success", 200, data);
    } catch (error) {
      next(error);
    }
  };
  getMostJobType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const range = req.query.range as
        | "7d"
        | "month"
        | "year"
        | "all"
        | undefined;
      const result = await this.analyticService.getMostJobType({ range });
      sendResponse(res, "success", 200, result);
    } catch (error) {
      next(error);
    }
  };
}
export default AnalyticController;
