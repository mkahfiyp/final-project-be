import { NextFunction, Request, Response } from "express";
import {
  changePasswordService,
  regisService,
  registerGoogleService,
  requestForgetPasswordService,
  resetPasswordService,
  SignInService,
  verifyEmailService,
} from "../services/auth.services";
import { createToken } from "../utils/createToken";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";
import { SignInMap } from "../mappers/auth.mappers";
import { getDataFromGoogle } from "../utils/getPaylodGoogle";
import {
  findUserByGoogleId,
  FinWithGetDataUser,
} from "../repositories/auth.repository";
import { Role } from "../../prisma/generated/client";

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await regisService(req.body);
      sendResponse(res, "Registration success", 200);
    } catch (error) {
      next(error);
    }
  };
  SignIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { remember, ...data } = req.body;
      const result = await SignInService(data);
      const token = createToken(
        {
          id: result.user_id,
          email: result.email,
          isVerified: result.isVerfied,
          role: result.role,
        },
        remember ? "30d" : "1d"
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict", // cegah CSRF
        maxAge: remember
          ? 30 * 24 * 60 * 60 * 1000 // 30 hari
          : 24 * 60 * 60 * 1000, // 1 hari
      });

      const payload = SignInMap(result);
      sendResponse(res, `Hello ${result.username}`, 200, payload);
    } catch (error) {
      next(error);
    }
  };
  verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = res.locals.decript;
      const user = await verifyEmailService(id, role);
      if (!user) {
        throw new AppError("Faild Verify Account", 500);
      }
      sendResponse(res, "verification success", 200);
    } catch (error) {
      next(error);
    }
  };
  keepLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = res.locals.decript;
      const user = await FinWithGetDataUser(email);
      if (!user) {
        throw new AppError("Unauthorized", 402);
      }
      const payload = {
        email,
        role,
        profile_picture:
          user.role === Role.COMPANY
            ? user.companies?.profile_picture
            : user.profiles?.profile_picture,
        isVerified: user.isVerfied,
      };
      sendResponse(res, "keep login", 200, payload);
    } catch (error) {
      next(error);
    }
  };
  logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("token");
      sendResponse(res, "log out success", 200);
    } catch (error) {
      next(error);
    }
  };
  requestForgetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await requestForgetPasswordService(req.body.email);
      if (user) {
        sendResponse(res, "success send request", 200);
      }
    } catch (error) {
      next(error);
    }
  };
  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = res.locals.decript.id;
      const password = req.body.newPassword;
      await resetPasswordService(id, password);
      sendResponse(res, "success reset password", 200);
    } catch (error) {
      next(error);
    }
  };
  registerGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await getDataFromGoogle(req.body.access_token);
      const role = req.body.role;
      if (!payload) {
        throw new AppError("server cannot get payload from google", 500);
      }
      const result = await registerGoogleService(payload, role);
      const token = createToken(
        {
          id: result.user_id,
          email: result.email,
          isVerified: result.isVerfied,
          role: result.role,
        },
        "1d"
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict", // cegah CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 hari
      });
      sendResponse(res, `Hello ${result.username}`, 200, SignInMap(result));
    } catch (error) {
      next(error);
    }
  };
  signInWithGoole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await getDataFromGoogle(req.body.access_token);
      const { remember } = req.body;
      if (!payload) {
        throw new AppError("server cannot get payload from google", 500);
      }
      const result = await findUserByGoogleId(payload.sub);
      if (!result) {
        throw new AppError("user not register", 400);
      }
      const token = createToken(
        {
          id: result.user_id,
          email: result.email,
          isVerified: result.isVerfied,
          role: result.role,
        },
        remember ? "30d" : "1d"
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict", // cegah CSRF
        maxAge: remember
          ? 30 * 24 * 60 * 60 * 1000 // 30 hari
          : 24 * 60 * 60 * 1000, // 1 hari
      });
      sendResponse(res, `Hello ${result.username}`, 200, SignInMap(result));
    } catch (error) {
      next(error);
    }
  };
  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = res.locals.decript.id;
      const { newPassword, currentPassword } = req.body;
      await changePasswordService(currentPassword, newPassword, id);
      sendResponse(res, "success", 200);
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
