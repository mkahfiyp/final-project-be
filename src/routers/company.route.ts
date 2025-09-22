import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import CompanyController from "../controllers/company.controller";
import { validatorRole } from "../middleware/validatorRole";
import { Role } from "../../prisma/generated/client";
import { validator } from "../middleware/validation/validator";
import { schemaUpdateCompanyProfile } from "../middleware/validation/company.validation";
import { uploadMemory } from "../middleware/uploader";

class CompanyRouter {
  private route: Router;
  private companyController: CompanyController;
  constructor() {
    this.route = Router();
    this.companyController = new CompanyController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.route.get("/find", this.companyController.getFindCompany)
    // Public routes (no authentication required)
    this.route.get("/", this.companyController.getAllCompanies);
    this.route.get("/top/with-stats", this.companyController.getTopCompaniesWithStats);
    this.route.get("/top", this.companyController.getTopCompanies);
    this.route.get("/:id", this.companyController.getCompanyById);
    this.route.get("/name/:name", this.companyController.getCompanyByName);

    // Protected routes (authentication required)
    this.route.use(verifyToken);
    this.route.use(validatorRole(Role.COMPANY));
    this.route.get(
      "/get/my-data-profile",
      this.companyController.getCompanyProfile
    );
    this.route.patch(
      "/update-profile",
      uploadMemory().single("profile_picture"),
      validator(schemaUpdateCompanyProfile),
      this.companyController.updateCompanyProfile
    );
  }
  public getRouter(): Router {
    return this.route;
  }
}

export default CompanyRouter;
