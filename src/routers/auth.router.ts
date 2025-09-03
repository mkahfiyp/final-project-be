import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { schemaSignIn, validateSignUp } from "../middleware/validation/auth";
import { validator } from "../middleware/validation/validator";

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
    this.route.post(
      "/sign-in",
      validator(schemaSignIn),
      this.authController.SignIn
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default AuthRouter;
