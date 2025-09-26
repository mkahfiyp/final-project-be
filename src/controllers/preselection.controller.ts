import { NextFunction, Request, Response } from "express";
import PreselectionService from "../services/preselection.service";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";
import { SubmitPreselectionTest } from "../dto/application.dto";

class PreselectionController {
  private preselectionService = new PreselectionService();
  createPreselectionTest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const slug = req.params.slug as string;
      if (!slug) {
        throw new AppError("slug required", 400);
      }
      await this.preselectionService.createPreseelctionTest(
        res.locals.data,
        slug
      );
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
  getDetailPreselectionTest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const slug = req.params.slug as string;
      if (!slug) {
        throw new AppError("slug required", 400);
      }
      const result = await this.preselectionService.getDetailPreselectionTest(
        slug
      );
      sendResponse(res, "success", 200, result);
    } catch (error) {
      next(error);
    }
  };
  updatePreselectionTest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const selection_id = Number(req.params.selection_id);
      if (isNaN(selection_id)) {
        throw new AppError(
          "selection id required or selection id not a number",
          400
        );
      }
      await this.preselectionService.updatePreselectionTest(
        selection_id,
        res.locals.data
      );
      sendResponse(res, "success update preselection test", 200);
    } catch (error) {
      next(error);
    }
  };
  deactivePreselectionTest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const slug = req.params.slug;
      await this.preselectionService.deactivePreselectionTest(slug);
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
  checkIfAlreadyHavePreselectionTest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result =
        await this.preselectionService.checkIfAlreadyHavePreselectionTest(
          req.params.slug
        );
      sendResponse(res, "success", 200, result);
    } catch (error) {
      next(error);
    }
  };
  submitSoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: SubmitPreselectionTest = {
        user_id: res.locals.decript.id,
        selection_id: req.body.selection_id,
        score: req.body.score,
      };
      await this.preselectionService.submitSoal(data);
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
  checkIfAlreadySubmit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = res.locals.decript.id;
      const job_id = Number(req.params.job_id);
      await this.preselectionService.checkIfAlreadySubmit(job_id, user_id);
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
}

export default PreselectionController;
