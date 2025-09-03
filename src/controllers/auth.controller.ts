import { NextFunction, Request, Response } from "express";
import { regisService, SignInService } from "../services/auth.services";
import { prisma } from "../config/prisma";
import { createToken } from "../utils/createToken";
import AppError from "../errors/appError";
import { sendResponse } from "../utils/sendResponse";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { confirmPassword, ...data } = req.body;
      const newUser = await regisService(data);

      res.status(201).send({
        success: true,
        message: "Add Data Success",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  SignIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await SignInService(req.body);

      const token = createToken(
        { id: result.user_id, isVerified: result.isVerfied, role: result.role },
        "30d"
      );

      res.cookie("token", token, {
        httpOnly: true, // tidak bisa diakses JS frontend (lebih aman)
        secure: process.env.NODE_ENV === "production", // hanya https kalau production
        sameSite: "strict", // cegah CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 hari
      });
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public async verifyAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const account = await prisma.users.update({
        where: {
          user_id: parseInt(res.locals.decript.id),
        },
        data: { isVerfied: true },
      });
      res.status(200).send({
        success: true,
        message: "Verification success",
      });
    } catch (error) {
      next(error);
    }
  }

  keepLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = res.locals.decript.id;
      if (!id) {
        throw new AppError("Unauthorized", 402);
      }
      sendResponse(res, "keep login", 200);
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
