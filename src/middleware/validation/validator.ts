import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validator =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
