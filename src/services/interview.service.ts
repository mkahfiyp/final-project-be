// import InterviewRepository from "../repositories/interview.repository";
// import AppError from "../errors/appError";
// import { prisma } from "../config/prisma";
// import { Status } from "../../prisma/generated/client";

// class InterviewService {
//   private interviewRepository = new InterviewRepository();

//   /**
//    * Get interviews based on user role
//    */
//   async getInterviews(
//     userId: number,
//     userRole: string,
//     page: number = 1,
//     limit: number = 10
//   ) {
//     try {
//       if (userRole === "USER") {
//         // Get interviews where user is the candidate
//         const result = await this.interviewRepository.getInterviewsForUser(
//           userId,
//           page,
//           limit
//         );
//         return {
//           data: result.data,
//           pagination: {
//             page: result.page,
//             limit: result.limit,
//             total: result.total,
//             totalPages: result.totalPages,
//           },
//         };
//       } else if (userRole === "COMPANY") {
//         // Get company first
//         const company = await prisma.companies.findUnique({
//           where: {
//             user_id: userId,
//           },
//         });

//         if (!company) {
//           throw new AppError("Company not found for this user", 404);
//         }

//         const result = await this.interviewRepository.getInterviewsForCompany(
//           company.company_id,
//           page,
//           limit
//         );
//         return {
//           data: result.data,
//           pagination: {
//             page: result.page,
//             limit: result.limit,
//             total: result.total,
//             totalPages: result.totalPages,
//           },
//         };
//       } else {
//         throw new AppError("Invalid user role for interviews", 403);
//       }
//     } catch (error) {
//       if (error instanceof AppError) {
//         throw error;
//       }
//       throw new AppError("Failed to fetch interviews", 500);
//     }
//   }

//   /**
//    * Schedule interview (company only)
//    */
//   async scheduleInterview(
//     userId: number,
//     applicationId: number,
//     schedule: string
//   ) {
//     // Validate required fields
//     if (!applicationId || !schedule) {
//       throw new AppError(
//         "Missing required fields: application_id, schedule",
//         400
//       );
//     }

//     // Validate schedule date
//     const scheduleDate = new Date(schedule);
//     if (isNaN(scheduleDate.getTime())) {
//       throw new AppError("Invalid schedule date format", 400);
//     }

//     if (scheduleDate < new Date()) {
//       throw new AppError("Interview schedule cannot be in the past", 400);
//     }

//     try {
//       // Check if user is company owner and owns the application's job
//       const company = await prisma.companies.findUnique({
//         where: {
//           user_id: userId,
//         },
//       });

//       if (!company) {
//         throw new AppError("Company not found for this user", 404);
//       }

//       // Get application and verify ownership
//       const application = await prisma.applications.findUnique({
//         where: {
//           application_id: applicationId,
//         },
//         include: {
//           Jobs: true,
//         },
//       });

//       if (!application) {
//         throw new AppError("Application not found", 404);
//       }

//       if (application.Jobs?.company_id !== company.company_id) {
//         throw new AppError(
//           "Unauthorized to schedule interview for this application",
//           403
//         );
//       }

//       // Update application status to INTERVIEW
//       await prisma.applications.update({
//         where: {
//           application_id: applicationId,
//         },
//         data: {
//           status: Status.INTERVIEW,
//         },
//       });

//       return await this.interviewRepository.createInterview(
//         applicationId,
//         scheduleDate
//       );
//     } catch (error) {
//       if (error instanceof AppError) {
//         throw error;
//       }
//       throw new AppError("Failed to schedule interview", 500);
//     }
//   }

//   /**
//    * Update interview schedule
//    */
//   async updateInterviewSchedule(
//     interviewId: number,
//     schedule: string,
//     userId: number
//   ) {
//     // Validate schedule date
//     const scheduleDate = new Date(schedule);
//     if (isNaN(scheduleDate.getTime())) {
//       throw new AppError("Invalid schedule date format", 400);
//     }

//     try {
//       // Get interview and verify permissions
//       const interview = await this.interviewRepository.getInterviewById(
//         interviewId
//       );

//       if (!interview) {
//         throw new AppError("Interview not found", 404);
//       }

//       // Check if user has permission to update this interview
//       const company = await prisma.companies.findUnique({
//         where: {
//           user_id: userId,
//         },
//       });

//       if (
//         !company ||
//         interview.application.Jobs?.company_id !== company.company_id
//       ) {
//         throw new AppError("Unauthorized to update this interview", 403);
//       }

//       return await this.interviewRepository.updateInterviewSchedule(
//         interviewId,
//         scheduleDate
//       );
//     } catch (error) {
//       if (error instanceof AppError) {
//         throw error;
//       }
//       throw new AppError("Failed to update interview schedule", 500);
//     }
//   }

//   /**
//    * Get interview detail
//    */
//   async getInterviewDetail(interviewId: number, userId: number) {
//     try {
//       const interview = await this.interviewRepository.getInterviewById(
//         interviewId
//       );

//       if (!interview) {
//         throw new AppError("Interview not found", 404);
//       }

//       // Check permissions - user can view their own interviews or company can view their interviews
//       const isCandidate = interview.application.user_id === userId;

//       if (!isCandidate) {
//         const company = await prisma.companies.findUnique({
//           where: {
//             user_id: userId,
//           },
//         });

//         const isCompanyOwner =
//           company &&
//           interview.application.Jobs?.company_id === company.company_id;

//         if (!isCompanyOwner) {
//           throw new AppError("Unauthorized to view this interview", 403);
//         }
//       }

//       return interview;
//     } catch (error) {
//       if (error instanceof AppError) {
//         throw error;
//       }
//       throw new AppError("Failed to fetch interview detail", 500);
//     }
//   }
// }

// export default InterviewService;
