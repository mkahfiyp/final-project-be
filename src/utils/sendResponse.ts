import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  message: string,
  statusCode: number,
  data?: T
) => {
  return res.status(statusCode).json({ success: true, message, data });
};
