import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw {
        success: false,
        message: "Token not found",
      };
    }

    const checkToken = verify(token, process.env.TOKEN_KEY || "secret");
    // console.log(checkToken);

    res.locals.decript = checkToken;
    next();
  } catch (error) {
    next(error);
  }
};
