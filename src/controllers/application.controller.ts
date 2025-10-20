import { NextFunction, Request, Response } from "express";
import ApplicationService from "../services/application.service";
import { sendResponse } from "../utils/sendResponse";
import { FilterApplicant, CreateApplicationDto } from "../dto/application.dto";
import { Status } from "../../prisma/generated/client";
import AppError from "../errors/appError";
import { supabaseUploadPdf } from "../config/supabaseStorage";

class ApplicationController {
  private applicationService = new ApplicationService();

  createApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = res.locals.decript.id;
      const { job_id, expected_salary }: CreateApplicationDto = res.locals.data;

      // Check if file is uploaded
      if (!req.file) {
        throw new AppError("CV file is required", 400);
      }

      const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        throw new AppError(
          "Only PDF, DOC, and DOCX files are allowed for CV",
          400
        );
      }
      const cvUrl = await supabaseUploadPdf(req.file);
      const result = await this.applicationService.createApplication({
        user_id,
        job_id,
        expected_salary,
        cv: cvUrl,
      });

      sendResponse(res, "Application submitted successfully", 201, result);
    } catch (error) {
      next(error);
    }
  };

  getUserApplications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = res.locals.decript.id;
      const limit = Number(req.query.limit) || 10;
      const offset = Number(req.query.offset) || 0;

      const result = await this.applicationService.getUserApplications(
        user_id,
        limit,
        offset
      );

      sendResponse(
        res,
        "User applications retrieved successfully",
        200,
        result
      );
    } catch (error) {
      next(error);
    }
  };

  getUserApplicationsPaginated = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = res.locals.decript.id;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 8;

      // Calculate offset from page
      const offset = (page - 1) * limit;

      const result = await this.applicationService.getUserApplications(
        user_id,
        limit,
        offset
      );

      // Add pagination metadata
      const totalPages = Math.ceil(result.total / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      const paginatedResult = {
        ...result,
        pagination: {
          currentPage: page,
          totalPages,
          hasNextPage,
          hasPrevPage,
          totalItems: result.total,
        },
      };

      sendResponse(
        res,
        "User applications retrieved successfully",
        200,
        paginatedResult
      );
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
      const data = await this.applicationService.getCompanyApplicant(
        req.params.slug,
        filters,
        limit,
        offset
      );
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
