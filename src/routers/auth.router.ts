import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { schemaSignIn, schemaSignUp } from "../middleware/validation/auth";
import { validator } from "../middleware/validation/validator";
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
      this.route.post("/signup", validator(schemaSignUp), this.authController.register);
      this.route.post("/sign-in", validator(schemaSignIn), this.authController.SignIn);

      this.route.use(verifyToken);
      this.route.get("/verify", this.authController.verifyAccount);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default AuthRouter;
