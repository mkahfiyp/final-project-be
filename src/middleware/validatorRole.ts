import { NextFunction, Request, Response } from "express";
import { Role } from "../../prisma/generated/client";
import AppError from "../errors/appError";

export const validatorRole =
  (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (role === res.locals.decript.role) {
        next();
      }
      throw new AppError("Unauthorized", 401);
    } catch (error) {
      next(error);
    }
  };
