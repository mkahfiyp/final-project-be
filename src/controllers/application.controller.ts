import { NextFunction, Request, Response } from "express";
import ApplicationService from "../services/application.service";
import AppError from "../errors/appError";

class ApplicationController {
    private applicationService = new ApplicationService();

    /**
     * Get applications for authenticated user
     */
    getMyApplications = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const status = req.query.status as string;

            const result = await this.applicationService.getMyApplications(userId, page, limit, status);

            res.status(200).json({
                success: true,
                message: "Applications retrieved successfully",
                data: result.data,
                pagination: result.pagination,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get applications for company
     */
    getCompanyApplications = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const jobId = req.query.jobId ? parseInt(req.query.jobId as string) : undefined;
            const status = req.query.status as string;

            const result = await this.applicationService.getCompanyApplications(
                userId,
                page,
                limit,
                jobId,
                status
            );

            res.status(200).json({
                success: true,
                message: "Company applications retrieved successfully",
                data: result.data,
                pagination: result.pagination,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get application detail by ID
     */
    getApplicationDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const applicationId = parseInt(req.params.id);
            const userId = res.locals.decrypt.id;

            if (isNaN(applicationId)) {
                throw new AppError("Invalid application ID", 400);
            }

            const application = await this.applicationService.getApplicationDetail(applicationId, userId);

            res.status(200).json({
                success: true,
                message: "Application detail retrieved successfully",
                data: application,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Apply for a job
     */
    applyForJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const { job_id, expected_salary, cv } = req.body;

            const application = await this.applicationService.applyForJob(
                userId,
                job_id,
                expected_salary,
                cv
            );

            res.status(201).json({
                success: true,
                message: "Application submitted successfully",
                data: application,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Update application status (company only)
     */
    updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const applicationId = parseInt(req.params.id);
            const userId = res.locals.decrypt.id;
            const { status } = req.body;

            if (isNaN(applicationId)) {
                throw new AppError("Invalid application ID", 400);
            }

            const application = await this.applicationService.updateApplicationStatus(
                applicationId,
                status,
                userId
            );

            res.status(200).json({
                success: true,
                message: "Application status updated successfully",
                data: application,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default ApplicationController;
