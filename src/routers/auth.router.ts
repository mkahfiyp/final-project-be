import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import {
  schemaChangePassword,
  schemaForgetPassword,
  schemaGoogleAuth,
  schemaResetPassword,
  schemaSignGoogle,
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
    this.route.post(
      "/google/sign-up",
      validator(schemaGoogleAuth),
      this.authController.registerGoogle
    );
    this.route.post(
      "/google/sign-in",
      validator(schemaSignGoogle),
      this.authController.signInWithGoole
    );
    this.route.use(verifyToken);
    this.route.get("/keep-login", this.authController.keepLogin);
    this.route.get("/logout", this.authController.logOut);
    this.route.post(
      "/change-password",
      validator(schemaChangePassword),
      this.authController.changePassword
    );
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default AuthRouter;
