import { Router } from "express";
import PreselectionController from "../controllers/preselection.controller";
import { verifyToken } from "../middleware/verifyToken";
import { validatorRole } from "../middleware/validatorRole";
import { Role } from "../../prisma/generated/client";
import { validator } from "../middleware/validation/validator";
import { schemaPreselectionInput } from "../middleware/validation/preselection.validation";

class PreselectionRouter {
  private route: Router;
  private preselectionController = new PreselectionController();
  constructor() {
    this.route = Router();
    this.preselectionController = new PreselectionController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.route.use(verifyToken);
    this.route.post(
      "/create/:slug",
      validator(schemaPreselectionInput),
      validatorRole(Role.COMPANY),
      this.preselectionController.createPreselectionTest
    );
    this.route.get(
      "/detail/:slug",
      this.preselectionController.getDetailPreselectionTest
    );
    this.route.patch(
      "/edit/:selection_id",
      validator(schemaPreselectionInput),
      validatorRole(Role.COMPANY),
      this.preselectionController.updatePreselectionTest
    );
    this.route.patch(
      "/deactive/:slug",
      validatorRole(Role.COMPANY),
      this.preselectionController.deactivePreselectionTest
    );
    this.route.get(
      "/active/:slug",
      validatorRole(Role.COMPANY),
      this.preselectionController.checkIfAlreadyHavePreselectionTest
    );
    this.route.post(
      "/submit",
      validatorRole(Role.USER),
      this.preselectionController.submitSoal
    );
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default PreselectionRouter;
