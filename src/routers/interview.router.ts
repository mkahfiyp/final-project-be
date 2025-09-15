// import { Router } from "express";
// import InterviewController from "../controllers/interview.controller";
// import { verifyToken } from "../middleware/verifyToken";

// class InterviewRouter {
//   private router: Router;
//   private interviewController: InterviewController;

//   constructor() {
//     this.router = Router();
//     this.interviewController = new InterviewController();
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     // Get interviews (both for users and companies based on role)
//     this.router.get("/", verifyToken, this.interviewController.getInterviews);

//     // Get interview detail by ID
//     this.router.get("/:id", verifyToken, this.interviewController.getInterviewDetail);

//     // Schedule interview (company only)
//     this.router.post("/", verifyToken, this.interviewController.scheduleInterview);

//     // Update interview schedule
//     this.router.put("/:id", verifyToken, this.interviewController.updateInterviewSchedule);
//   }

//   getRouter(): Router {
//     return this.router;
//   }
// }

// export default InterviewRouter;
