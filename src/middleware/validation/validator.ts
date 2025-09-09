import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import AppError from "../../errors/appError";

export const validator =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const result = schema.safeParse(req.body);
      if (!result.success) {
        // ambil semua error messages
        const messages = result.error.issues.map((i) => i.message).join(", ");
        throw new AppError(messages, 400);
      }

      // simpan data yang sudah di-parse ke res.locals.data
      res.locals.data = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
