import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validateSignUp } from "../middleware/validation/auth";
import { verifyToken } from "../middleware/verifyToken";

class AuthRouter {
    private route: Router;
    private authController: AuthController;

    constructor() {
        this.route = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.route.post("/signup", validateSignUp, this.authController.register);

        this.route.use(verifyToken);
        this.route.get("/verify", this.authController.verifyAccount);
    }

    public getRouter(): Router {
        return this.route;
    }
}

export default AuthRouter;