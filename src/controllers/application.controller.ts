import { NextFunction, Request, Response } from "express";
import ApplicationService from "../services/application.service";
import { sendResponse } from "../utils/sendResponse";
import { FilterApplicant } from "../dto/application.dto";
import { Status } from "../../prisma/generated/client";

class ApplicationController {
  private applicationService = new ApplicationService();

  getJobApplicantList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filters: FilterApplicant = {
        minAge: req.query.minAge ? Number(req.query.minAge) : undefined,
        maxAge: req.query.maxAge ? Number(req.query.maxAge) : undefined,
        minSalary: req.query.minSalary
          ? Number(req.query.minSalary)
          : undefined,
        maxSalary: req.query.maxSalary
          ? Number(req.query.maxSalary)
          : undefined,
        education: req.query.education as string,
        gender: req.query.gender as string,
        search: req.query.search as string,
        status: req.query.status as Status,
        sortBy: (req.query.sortBy as any) || "createdAt",
        sortOrder: (req.query.sortOrder as any) || "asc",
      };
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      console.log("query", filters, limit, offset);
      const data = await this.applicationService.getCompanyApplicant(
        req.params.slug,
        filters,
        limit,
        offset
      );
      console.log("ini data", data);
      sendResponse(res, "success", 200, data);
    } catch (error) {
      next(error);
    }
  };
  getDetailApplicant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const application_id = Number(req.params.application_id);
      const result = await this.applicationService.getDetailApplication(
        application_id
      );
      sendResponse(res, "success", 200, result);
    } catch (error) {
      next(error);
    }
  };
  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.params.status as Status;
      const application_id = Number(req.params.application_id);
      const user_id = res.locals.decript.id;
      await this.applicationService.updateStatus(
        status,
        application_id,
        user_id,
        req.body.message
      );
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
}

export default ApplicationController;
