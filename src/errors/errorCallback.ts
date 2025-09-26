import { NextFunction, Request, Response } from "express";
import AppError from "./appError";

export const erorrCallback = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.rc).json({
      success: error.success,
      message: error.message,
    });
  }

  const message = error instanceof Error ? error.message : "unknown error";
  return res.status(500).json({
    success: false,
    message,
  });
};
