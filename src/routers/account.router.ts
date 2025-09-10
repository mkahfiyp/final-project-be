import { Router } from "express";
import AccountController from "../controllers/account.controller";
import { verifyToken } from "../middleware/verifyToken";
import { validatorRole } from "../middleware/validatorRole";
import { Role } from "../../prisma/generated/client";
import { uploadMemory } from "../middleware/uploader";
import { validator } from "../middleware/validation/validator";
import {
  schemaCreateEducation,
  schemaUpdateProfileRoleUser,
} from "../middleware/validation/account.validation";

class AccountRouter {
  private route: Router;
  private accountController: AccountController;
  constructor() {
    this.route = Router();
    this.accountController = new AccountController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.route.use(verifyToken);
    this.route.use(validatorRole(Role.USER));
    this.route.get("/get-data/user", this.accountController.getProfileRoleUser);
    this.route.patch(
      "/update-profile/user",
      uploadMemory().single("profile_picture"),
      validator(schemaUpdateProfileRoleUser),
      this.accountController.updateProfileRoleUser
    );
    this.route.post(
      "/education/create",
      validator(schemaCreateEducation),
      this.accountController.createEducation
    );
    this.route.get("/education/list", this.accountController.getEducationList);
    this.route.get(
      "/education/detail/:education_id",
      this.accountController.getEducationDetail
    );
    this.route.patch(
      "/education/edit/:education_id",
      this.accountController.editEducation
    );
    this.route.delete(
      "/education/delete/:education_id",
      this.accountController.deleteEducation
    );
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default AccountRouter;
