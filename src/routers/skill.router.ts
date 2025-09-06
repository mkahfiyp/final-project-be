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
        this.route.get("/", this.skillController.getList);
        this.route.post("/", this.skillController.createSkill);
        this.route.delete("/:id", this.skillController.deleteSkill);
        this.route.put("/:id", this.skillController.updateSkill);
    }

    public getRouter(): Router {
        return this.route;
    }
}

export default SkillRouter;