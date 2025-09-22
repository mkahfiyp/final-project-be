import { Router } from "express";
import SkillController from "../controllers/skill.controller";

class SkillRouter {
    private route: Router;
    private skillController: SkillController;

    constructor() {
        this.route = Router();
        this.skillController = new SkillController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.route.get("/", this.skillController.getAllData);
    }

    public getRouter(): Router {
        return this.route;
    }
}

export default SkillRouter;