import { NextFunction, Request, Response } from "express";
import { regisService, SignInService } from "../services/auth.services";
import { prisma } from "../config/prisma";
import { createToken } from "../utils/createToken";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";
import { SignInMap } from "../mappers/auth.mappers";

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
      await prisma.users.update({
        where: {
          user_id: res.locals.decript.id,
        },
        data: { isVerfied: true },
      });
      sendResponse(res, "verification success", 200);
    } catch (error) {
      next(error);
    }
  };
  keepLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = res.locals.decript;
      if (!email) {
        throw new AppError("Unauthorized", 402);
      }
      sendResponse(res, "keep login", 200, { email, role });
    } catch (error) {
      next(error);
    }
  };
  logOut = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("token");
      sendResponse(res, "log out success", 200);
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
