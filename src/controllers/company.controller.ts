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
}
export default CompanyController;
