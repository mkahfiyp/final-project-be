import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import {
  schemaForgetPassword,
  schemaResetPassword,
  schemaSignIn,
  schemaSignUp,
} from "../middleware/validation/auth";
import { validator } from "../middleware/validation/validator";
import { verifyToken, verifyTokenEmail } from "../middleware/verifyToken";

class AuthRouter {
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.route = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post(
      "/signup",
      validator(schemaSignUp),
      this.authController.register
    );
    this.route.post(
      "/sign-in",
      validator(schemaSignIn),
      this.authController.SignIn
    );
    this.route.get(
      "/verify",
      verifyTokenEmail,
      this.authController.verifyAccount
    );
    this.route.post(
      "/forget-password",
      validator(schemaForgetPassword),
      this.authController.requestForgetPassword
    );
    this.route.post(
      "/reset-password",
      validator(schemaResetPassword),
      verifyTokenEmail,
      this.authController.resetPassword
    );
    this.route.use(verifyToken);
    this.route.get("/keep-login", this.authController.keepLogin);
    this.route.get("/logout", this.authController.logOut);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default AuthRouter;
