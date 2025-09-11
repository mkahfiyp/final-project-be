import { NextFunction, Request, Response } from "express";
import PreselectionService from "../services/preselection.service";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";

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
}

export default PreselectionController;
