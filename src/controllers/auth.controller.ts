import { NextFunction, Request, Response } from "express";
import { regisService } from "../services/auth.services";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = await regisService(req.body);

            res.status(201).send({
                success: true,
                message: "Add Data Success",
                data: newUser,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;