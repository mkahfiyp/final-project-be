import { NextFunction, Request, Response } from "express";
import AccountService from "../services/account.service";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";
import { dataRoleUserMap } from "../mappers/account.mappers";
import { UploadApiResponse } from "cloudinary";
import { cloudinaryUpload } from "../config/coudinary";

class AccountController {
  private accountService = new AccountService();
  getProfileRoleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = res.locals.decript;
      const dataUser = await this.accountService.getDataRoleUser(id);
      if (!dataUser) {
        throw new AppError("cannot get data", 500);
      }
      const payload = dataRoleUserMap(dataUser);
      sendResponse(res, "success", 200, payload);
    } catch (error) {
      next(error);
    }
  };
  updateProfileRoleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = res.locals.decript;
      let upload: UploadApiResponse | undefined;
      if (req.file) {
        upload = await cloudinaryUpload(req.file);
      }
      const user = await this.accountService.updateProfileRoleUser(id, {
        ...req.body,
        profile_picture: upload?.secure_url,
      });
      if (user) {
        sendResponse(res, "update success", 200);
      }
    } catch (error) {
      next(error);
    }
  };
  createEducation = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
export default AccountController;
