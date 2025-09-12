import { NextFunction, Request, Response } from "express";
import ApplicationService from "../services/application.service";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";
import { getJobApplicantListMap } from "../mappers/applicantion.mappers";
import { FilterApplicant } from "../dto/application.dto";

class ApplicationController {
  private applicationService = new ApplicationService();

  /**
   * Get applications for authenticated user
   */
  getMyApplications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.decrypt.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;

      const result = await this.applicationService.getMyApplications(
        userId,
        page,
        limit,
        status
      );

      res.status(200).json({
        success: true,
        message: "Applications retrieved successfully",
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getJobApplicantList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Ambil filters dari query params
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
        status: req.query.status as string,
        sortBy: (req.query.sortBy as any) || "createdAt",
        sortOrder: (req.query.sortOrder as any) || "asc",
      };

      const data = await this.applicationService.getCompanyApplicant(
        req.params.slug,
        filters
      );

      sendResponse(res, "success", 200, getJobApplicantListMap(data));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get application detail by ID
   */
  getApplicationDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const applicationId = parseInt(req.params.id);
      const userId = res.locals.decrypt.id;

      if (isNaN(applicationId)) {
        throw new AppError("Invalid application ID", 400);
      }

      const application = await this.applicationService.getApplicationDetail(
        applicationId,
        userId
      );

      res.status(200).json({
        success: true,
        message: "Application detail retrieved successfully",
        data: application,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Apply for a job
   */
  applyForJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.decrypt.id;
      const { job_id, expected_salary, cv } = req.body;

      const application = await this.applicationService.applyForJob(
        userId,
        job_id,
        expected_salary,
        cv
      );

      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        data: application,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update application status (company only)
   */
  updateApplicationStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const applicationId = parseInt(req.params.id);
      const userId = res.locals.decrypt.id;
      const { status } = req.body;

      if (isNaN(applicationId)) {
        throw new AppError("Invalid application ID", 400);
      }

      const application = await this.applicationService.updateApplicationStatus(
        applicationId,
        status,
        userId
      );

      res.status(200).json({
        success: true,
        message: "Application status updated successfully",
        data: application,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ApplicationController;
