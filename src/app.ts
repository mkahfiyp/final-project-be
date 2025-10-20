import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import AuthRouter from "./routers/auth.router";
import { erorrCallback } from "./errors/errorCallback";
import cookieParser from "cookie-parser";
import AppError from "./errors/appError";
import SkillAssessmentRouter from "./routers/skillAssessment.router";
import QuestionRouter from "./routers/question.router";
import AccountRouter from "./routers/account.router";
import EducationRouter from "./routers/education.router";
import ExperienceRouter from "./routers/experience.router";
import JobSaveRouter from "./routers/jobSave.router";
import ApplicationRouter from "./routers/application.router";
import InterviewRouter from "./routers/interview.router";
import { blogRouter } from "./routers/blog.router";
import PostingsRouter from "./routers/postings.route";
import CompanyRouter from "./routers/company.route";
import UserAssessmentRouter from "./routers/userAssessment.router";
import PreselectionRouter from "./routers/preselection.router";
import UserCompanyRouter from "./routers/userCompany.router";
import UserSubscriptionRouter from "./routers/userSubscription.router";
import ReviewCompanyRouter from "./routers/reviewCompany.router";
import SubscriptionRouter from "./routers/subscription.router";
import AnalyticRouter from "./routers/analytic.route";
import { job } from "./server";
import AssessmentCertificateRouter from "./routers/AssessmentCertificate.router";
import PublicProfileRouter from "./routers/publicProfile.router";
import UserSkillRouter from "./routers/userSkill.router";
import SkillRouter from "./routers/skill.router";
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
    this.app.set('trust proxy', 1);
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
    const accountRouter: AccountRouter = new AccountRouter();
    const authRouter: AuthRouter = new AuthRouter();
    const skillAssessmentRouter: SkillAssessmentRouter = new SkillAssessmentRouter();
    const questionRouter: QuestionRouter = new QuestionRouter();
    const companyRouter: CompanyRouter = new CompanyRouter();
    const postingsRoter: PostingsRouter = new PostingsRouter();
    const userAssessmentRouter: UserAssessmentRouter = new UserAssessmentRouter();
    const educationRouter: EducationRouter = new EducationRouter();
    const experienceRouter: ExperienceRouter = new ExperienceRouter();
    const jobSaveRouter: JobSaveRouter = new JobSaveRouter();
    const applicationRouter: ApplicationRouter = new ApplicationRouter();
    const interviewRouter: InterviewRouter = new InterviewRouter();
    const preselection: PreselectionRouter = new PreselectionRouter();
    const userCompanyRouter: UserCompanyRouter = new UserCompanyRouter();
    const userSubscriptionRouter: UserSubscriptionRouter = new UserSubscriptionRouter();
    const reviewCompanyRouter: ReviewCompanyRouter = new ReviewCompanyRouter();
    const subscriptionRouter: SubscriptionRouter = new SubscriptionRouter();
    const analyticRouter: AnalyticRouter = new AnalyticRouter();
    const assessmentCertificateRouter: AssessmentCertificateRouter = new AssessmentCertificateRouter();
    const publicProfileRouter: PublicProfileRouter = new PublicProfileRouter();
    const userSKillRouter: UserSkillRouter = new UserSkillRouter();
    const sKillRouter: SkillRouter = new SkillRouter();

    this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send("<h1>Job Portal API</h1>");
    });

    // Authentication routes
    this.app.use("/auth", authRouter.getRouter());

    // User profile routes
    this.app.use("/account", accountRouter.getRouter());

    // Public profile routes (no authentication required)
    this.app.use("/public", publicProfileRouter.getRouter());

    // Company routes
    this.app.use("/company", companyRouter.getRouter());

    // Job posting routes
    this.app.use("/postings", postingsRoter.getRouter());

    // Education & Experience routes
    this.app.use("/educations", educationRouter.getRouter());
    this.app.use("/experiences", experienceRouter.getRouter());

    // Job save routes
    this.app.use("/job-saves", jobSaveRouter.getRouter());

    // Application routes
    this.app.use("/applications", applicationRouter.getRouter());

    // Interview routes
    this.app.use("/interviews", interviewRouter.getRouter());

    // Blog routes
    this.app.use("/blog", blogRouter);

    // Skill assessment routes
    this.app.use("/skillAssessments", skillAssessmentRouter.getRouter());
    this.app.use("/questions", questionRouter.getRouter());
    this.app.use("/company", companyRouter.getRouter());
    this.app.use("/postings", postingsRoter.getRouter());
    this.app.use("/userAssessments", userAssessmentRouter.getRouter());
    this.app.use("/user-companies", userCompanyRouter.getRouter());
    this.app.use("/userSubscription", userSubscriptionRouter.getRouter());
    this.app.use("/reviewCompany", reviewCompanyRouter.getRouter());
    this.app.use("/subscription", subscriptionRouter.getRouter());
    this.app.use("/assessmentCertificate", assessmentCertificateRouter.getRouter());
    this.app.use("/user-skill", userSKillRouter.getRouter());
    this.app.use("/skill", sKillRouter.getRouter());

    this.app.use("/preselection", preselection.getRouter());
    this.app.use("/analytic", analyticRouter.getRouter());
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
      job.start();
    });
  }
}
export default App;
