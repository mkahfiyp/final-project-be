import { NextFunction, Request, Response } from "express";
import { Role } from "../../prisma/generated/client";
import AppError from "../errors/appError";
import { prisma } from "../config/prisma";

export const validatorRole =
  (role: Role) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (role !== res.locals.decript.role || !res.locals.decript.isVerified) {
        throw new AppError("Unauthorized", 401);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
