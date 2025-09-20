import { Router } from "express";
import AccountController from "../controllers/account.controller";

class PublicProfileRouter {
    private route: Router;
    private accountController: AccountController;

    constructor() {
        this.route = Router();
        this.accountController = new AccountController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Public endpoint to search users by name
        this.route.get("/search", this.accountController.searchUsers);
        
        // Public endpoint to get profile by username
        this.route.get("/profile/:username", this.accountController.getProfileByUsername);
    }

    public getRouter(): Router {
        return this.route;
    }
}

export default PublicProfileRouter;