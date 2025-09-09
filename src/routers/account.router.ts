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
    this.route.get(
      "/get-data/user",
      validatorRole(Role.USER),
      this.accountController.getProfileRoleUser
    );
    this.route.patch(
      "/update-profile/user",
      validatorRole(Role.USER),
      uploadMemory().single("profile_picture"),
      validator(schemaUpdateProfileRoleUser),
      this.accountController.updateProfileRoleUser
    );
    this.route.post(
      "/education/create",
      validatorRole(Role.USER),
      validator(schemaCreateEducation),
      this.accountController.createEducation
    );
    this.route.get(
      "/education/list",
      validatorRole(Role.USER),
      this.accountController.getEducationList
    );
    this.route.get(
      "/education/detail/:education_id",
      validatorRole(Role.USER),
      this.accountController.getEducationDetail
    );
    this.route.patch(
      "/education/edit/:education_id",
      validatorRole(Role.USER),
      this.accountController.editEducation
    );
    this.route.delete(
      "/education/delete/:education_id",
      validatorRole(Role.USER),
      this.accountController.deleteEducation
    );
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default AccountRouter;
