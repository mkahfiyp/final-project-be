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
          name: true,
        },
        take: 20,
      });
      const skillNames = skills.map((s) => s.name);
      sendResponse(res, "success get skill list", 200, { skillNames });
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
      const category = (req.query.category as string).toLocaleUpperCase() || "";

      const myJobs = await this.postingsService.getMyJobList(
        search,
        sort,
        category,
        user_id
      );
      sendResponse(res, "success", 200, myJobs);
    } catch (error) {
      next(error);
    }
  };
}
export default PostingsController;
