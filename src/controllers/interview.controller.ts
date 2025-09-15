// import { NextFunction, Request, Response } from "express";
// import InterviewService from "../services/interview.service";
// import AppError from "../errors/appError";

// class InterviewController {
//     private interviewService = new InterviewService();

//     /**
//      * Get interviews (for both users and companies)
//      */
//     getInterviews = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const userId = res.locals.decrypt.id;
//             const userRole = res.locals.decrypt.role;
//             const page = parseInt(req.query.page as string) || 1;
//             const limit = parseInt(req.query.limit as string) || 10;

//             const result = await this.interviewService.getInterviews(userId, userRole, page, limit);

//             res.status(200).json({
//                 success: true,
//                 message: "Interviews retrieved successfully",
//                 data: result.data,
//                 pagination: result.pagination,
//             });
//         } catch (error) {
//             next(error);
//         }
//     };

//     /**
//      * Schedule interview (company only)
//      */
//     scheduleInterview = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const userId = res.locals.decrypt.id;
//             const { application_id, schedule } = req.body;

//             const interview = await this.interviewService.scheduleInterview(
//                 userId,
//                 application_id,
//                 schedule
//             );

//             res.status(201).json({
//                 success: true,
//                 message: "Interview scheduled successfully",
//                 data: interview,
//             });
//         } catch (error) {
//             next(error);
//         }
//     };

//     /**
//      * Update interview schedule
//      */
//     updateInterviewSchedule = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const userId = res.locals.decrypt.id;
//             const interviewId = parseInt(req.params.id);
//             const { schedule } = req.body;

//             if (isNaN(interviewId)) {
//                 throw new AppError("Invalid interview ID", 400);
//             }

//             const interview = await this.interviewService.updateInterviewSchedule(
//                 interviewId,
//                 schedule,
//                 userId
//             );

//             res.status(200).json({
//                 success: true,
//                 message: "Interview schedule updated successfully",
//                 data: interview,
//             });
//         } catch (error) {
//             next(error);
//         }
//     };

//     /**
//      * Get interview detail
//      */
//     getInterviewDetail = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const userId = res.locals.decrypt.id;
//             const interviewId = parseInt(req.params.id);

//             if (isNaN(interviewId)) {
//                 throw new AppError("Invalid interview ID", 400);
//             }

//             const interview = await this.interviewService.getInterviewDetail(interviewId, userId);

//             res.status(200).json({
//                 success: true,
//                 message: "Interview detail retrieved successfully",
//                 data: interview,
//             });
//         } catch (error) {
//             next(error);
//         }
//     };
// }

// export default InterviewController;
