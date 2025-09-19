import { NextFunction, Request, Response } from "express";
import AnalyticService from "../services/analytic.service";
import { sendResponse } from "../utils/sendResponse";

class AnalyticController {
  private analyticService = new AnalyticService();

  getUserAge = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gender = req.query.gender as "male" | "female" | undefined;
      const range = req.query.range as
        | "7d"
        | "month"
        | "year"
        | "all"
        | undefined;

      const data = await this.analyticService.getUserDemographics({
        gender,
        range,
      });

      sendResponse(res, "success", 200, data);
    } catch (error) {
      next(error);
    }
  };
}

export default AnalyticController;
