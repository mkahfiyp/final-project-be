import { Router } from "express";
import UserCompanyController from "../controllers/userCompany.controller";
import { verifyToken } from "../middleware/verifyToken";

class UserCompanyRouter {
    private router: Router;
    private userCompanyController: UserCompanyController;

    constructor() {
        this.router = Router();
        this.userCompanyController = new UserCompanyController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(verifyToken);

        this.router.post(
            "/",
            this.userCompanyController.createUserCompany
        );

        this.router.get(
            "/",
            this.userCompanyController.getUserCompanies
        );

        this.router.patch(
            "/:id",
            this.userCompanyController.updateUserCompany
        );

        this.router.delete(
            "/:id",
            this.userCompanyController.deleteUserCompany
        );
    }

    getRouter(): Router {
        return this.router;
    }
}

export default UserCompanyRouter;