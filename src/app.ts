import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import AuthRouter from "./routers/auth.router";
import { erorrCallback } from "./errors/errorCallback";
import cookieParser from "cookie-parser";
import { unknown } from "zod";
import AppError from "./errors/appError";
import SkillRouter from "./routers/skill.router";
import QuestionRouter from "./routers/question.router";
const PORT: string = process.env.PORT || "8181";
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.route();
    this.errorHandler();
  }

  private configure(): void {
    this.app.use(
      cors({
        origin: process.env.FE_URL, // frontend
        credentials: true,
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
  }

  private route(): void {
    const authRouter: AuthRouter = new AuthRouter();
    const skillRouter: SkillRouter = new SkillRouter();
    const questionRouter: QuestionRouter = new QuestionRouter();

    this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send("<h1>Classbase API</h1>");
    });
    this.app.use("/auth", authRouter.getRouter());
    this.app.use("/skillAssessments", skillRouter.getRouter());
    this.app.use("/questions", questionRouter.getRouter());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      throw new AppError("Route Not Found", 404);
    });
  }

  private errorHandler = (): void => {
    this.app.use(erorrCallback);
  };

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`API RUNNING : http:localhost:${PORT}`);
    });
  }
}
export default App;
