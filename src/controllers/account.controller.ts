import { NextFunction, Request, Response } from "express";
import AccountService from "../services/account.service";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";
import { dataRoleUserMap } from "../mappers/account.mappers";
import { UploadApiResponse } from "cloudinary";
import { cloudinaryUploadPdf } from "../config/coudinary";
import { prisma } from "../config/prisma";

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
        upload = await cloudinaryUploadPdf(req.file);
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
      const { id } = res.locals.decript;
      await this.accountService.createEducation(req.body, id);
      sendResponse(res, "success created", 200);
    } catch (error) {
      next(error);
    }
  };
  getEducationList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = res.locals.decript.id;
      const data = await this.accountService.getEducationList(id);
      sendResponse(res, "success get education list", 200, data);
    } catch (error) {
      next(error);
    }
  };
  getEducationDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const education_id = Number(req.params.education_id);
      if (!education_id) {
        throw new AppError("incorect req params", 400);
      }
      const data = await this.accountService.getDetailEducation(education_id);
      sendResponse(res, "success get education detail", 200, data);
    } catch (error) {
      next(error);
    }
  };
  editEducation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const education_id = Number(req.params.education_id);
      if (!education_id) {
        throw new AppError("incorect req params", 400);
      }
      await this.accountService.editEducation(req.body, education_id);
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
  deleteEducation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const education_id = Number(req.params.education_id);
      if (!education_id) {
        throw new AppError("incorect req params", 400);
      }
      const result = await prisma.education.delete({
        where: { education_id },
      });
      if (!result) {
        throw new AppError("failed delete", 400);
      }
      sendResponse(res, "success", 200);
    } catch (error) {
      console.log(error);
    }
  };
}
export default AccountController;
