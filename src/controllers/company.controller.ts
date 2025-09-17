import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import CompanyService from "../services/company.service";
import { companyProfileMap } from "../mappers/company.mappers";
import { UploadApiResponse } from "cloudinary";
import { cloudinaryUpload } from "../config/coudinary";

class CompanyController {
  private companyService = new CompanyService();
  getCompanyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.companyService.getCompanyProfile(
        res.locals.decript.id
      );
      console.log(result);
      sendResponse(res, "success", 200, companyProfileMap(result));
    } catch (error) {
      next(error);
    }
  };
  updateCompanyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = Number(res.locals.decript.id);
      let upload: UploadApiResponse | undefined;
      if (req.file) {
        upload = await cloudinaryUpload(req.file);
      }
      await this.companyService.updateCompanyProfile(
        user_id,
        req.body,
        upload?.secure_url
      );
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };

  // Public endpoint to get all companies
  getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      const result = await this.companyService.getAllCompanies({
        page,
        limit,
        search,
      });

      sendResponse(res, "success get all companies", 200, result);
    } catch (error) {
      next(error);
    }
  };

  // Public endpoint to get company by ID
  getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = parseInt(req.params.id);

      if (!companyId || isNaN(companyId)) {
        return sendResponse(res, "Invalid company ID", 400);
      }

      const result = await this.companyService.getCompanyById(companyId);

      if (!result) {
        return sendResponse(res, "Company not found", 404);
      }

      sendResponse(res, "success get company detail", 200, result);
    } catch (error) {
      next(error);
    }
  };

  getCompanyByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyName = req.params.name.replace(/-/g, " ");
      const result = await this.companyService.getCompanyByName(companyName);
      sendResponse(res, "Get Company detail by name", 200, result);
    } catch (error) {
      next(error);
    }
  }
}
export default CompanyController;
