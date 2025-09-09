import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/appError";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError("Token Not Found", 402);
    }

    if (!process.env.TOKEN_KEY) {
      throw new AppError("server missing secret key", 500);
    }
    const checkToken = verify(token, process.env.TOKEN_KEY);
    res.locals.decript = checkToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyTokenEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("token not provided", 402);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("token not found", 402);
    }

    if (!process.env.TOKEN_KEY) {
      throw new AppError("server missing secret key", 500);
    }
    const checkToken = verify(token, process.env.TOKEN_KEY);
    res.locals.decript = checkToken;
    next();
  } catch (error) {
    next(error);
  }
};
