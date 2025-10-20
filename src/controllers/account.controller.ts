import { NextFunction, Request, Response } from "express";
import AccountService from "../services/account.service";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";
import { dataRoleUserMap, publicProfileMap } from "../mappers/account.mappers";
import { UploadApiResponse } from "cloudinary";
import { prisma } from "../config/prisma";
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
      next(error);
    }
  };
  getProfileByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username } = req.params;
      if (!username) {
        throw new AppError("Username is required", 400);
      }
      const profile = await this.accountService.getProfileByUsername(username);
      const payload = publicProfileMap(profile);
      sendResponse(res, "success", 200, payload);
    } catch (error) {
      next(error);
    }
  };
  searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        throw new AppError("Search query 'q' is required", 400);
      }
      const users = await this.accountService.searchUsersByName(q);
      const payload = users.map((user) => ({
        username: user.username,
        name: user.name,
        profile_picture: user.profiles?.profile_picture || null,
        role: user.role,
      }));
      sendResponse(res, "success", 200, payload);
    } catch (error) {
      next(error);
    }
  };

  getDataForCvGenerator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = res.locals.decript.id;
      const result = await this.accountService.getDataForCvGenerator(id);
      sendResponse(res, "CV generator", 200, result);
    } catch (error) {
      next(error);
    }
  };
}
export default AccountController;
