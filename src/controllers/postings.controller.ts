import { NextFunction, Request, Response } from "express";
import {
  Category,
  Currency,
  JobType,
  PeriodSalary,
} from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import { sendResponse } from "../utils/sendResponse";
import PostingsService from "../services/postings.service";
import AppError from "../errors/appError";
import { getMyJobListMap } from "../mappers/potings.mappers";
import { formatEnumCategory } from "../utils/createSlug";

class PostingsController {
  private postingsService = new PostingsService();
  getGenralData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = Object.values(Category);
      const jobTypes = Object.values(JobType);
      const periodSalary = Object.values(PeriodSalary);
      const currencies = Object.values(Currency);
      const payload = {
        categories,
        jobTypes,
        periodSalary,
        currencies,
      };
      sendResponse(res, "success get general data", 200, payload);
    } catch (error) {
      next(error);
    }
  };
  getSkillList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search = (req.query.search as string) ?? "";
      const skills = await prisma.skills.findMany({
        where: {
          name: {
            contains: search, // filter skill name
            mode: "insensitive", // case-insensitive
          },
        },
        select: {
          id: true, // ambil id juga
          name: true, // ambil name
        },
        take: 20,
      });

      sendResponse(res, "success get skill list", 200, { skills });
    } catch (error) {
      next(error);
    }
  };
  createJobPosting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = res.locals.decript.id;
      const data = res.locals.data;
      await this.postingsService.createJobPosting(data, user_id);
      sendResponse(res, "success created", 200);
    } catch (error) {
      next(error);
    }
  };
  getMyJobList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = res.locals.decript.id;
      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "";
      const category = (req.query.category as string) || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const onlyPreselection = req.query.onlyPreselection as string;
      const notExpired = req.query.notExpired as string;

      const myJobs = await this.postingsService.getMyJobList(
        search,
        sort,
        formatEnumCategory(category),
        user_id,
        page,
        limit,
        onlyPreselection,
        notExpired
      );
      sendResponse(res, "success", 200, getMyJobListMap(myJobs));
    } catch (error) {
      next(error);
    }
  };
  getDetailJobPosting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.postingsService.getDetailJobPostingForEdit(
        req.params.slug
      );
      console.log(result);
      sendResponse(res, "success", 200, result);
    } catch (error) {
      next(error);
    }
  };
  updateJobPostring = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const slug = req.params.slug;
      const data = res.locals.data;
      if (!slug) {
        throw new AppError("slug required", 400);
      }
      await this.postingsService.updateJobPostring(slug, data);
      sendResponse(res, "success update job", 200);
    } catch (error) {
      next(error);
    }
  };
  deleteJobPostring = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const slug = req.params.slug;
      if (!slug) {
        throw new AppError("slug required", 400);
      }
      await this.postingsService.deleteJobPostring(slug);
      sendResponse(res, "success delete job", 200);
    } catch (error) {
      next(error);
    }
  };

  // Public endpoint to get all job postings
  getAllJobPostings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const category = req.query.category as string;
      const location = req.query.location as string;
      const job_type = req.query.job_type as string;
      const salary_min = req.query.salary_min
        ? parseInt(req.query.salary_min as string)
        : undefined;
      const salary_max = req.query.salary_max
        ? parseInt(req.query.salary_max as string)
        : undefined;

      const result = await this.postingsService.getAllJobPostings({
        page,
        limit,
        search,
        category,
        location,
        job_type,
        salary_min,
        salary_max,
      });

      sendResponse(res, "success get all job postings", 200, result);
    } catch (error) {
      next(error);
    }
  };

  getApplicantId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await prisma.selections.findUnique({
        where: {
          job_id: Number(req.params.job_id),
        },
      });
      sendResponse(res, "success", 200, data);
    } catch (error) {
      console.log(error);
    }
  };
}
export default PostingsController;
