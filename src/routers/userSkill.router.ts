import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import UserSkillController from "../controllers/userSkill.controller";

class UserSkillRouter {
    private router: Router;
    private UserSkillController: UserSkillController;

    constructor() {
        this.router = Router();
        this.UserSkillController = new UserSkillController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(verifyToken);
        this.router.get("/", this.UserSkillController.getAllUserSkillByUserId);
        this.router.post("/", this.UserSkillController.createUserSkill);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default UserSkillRouter;