import { NextFunction, Request, Response } from "express";
import { regisService, SignInService } from "../services/auth.services";
import { prisma } from "../config/prisma";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { confirmPassword, ...payload } = req.body;
            const newUser = await regisService(payload);

            res.status(201).send({
              success: true,
              message: "Add Data Success",
              data: newUser,
            });
        } catch (error) {
          next(error);
        }
    };
  
    SignIn = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await SignInService(req.body);
        res.status(200).json(result);
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
}

export default AuthController;
