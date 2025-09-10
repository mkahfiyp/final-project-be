import { NextFunction, Request, Response } from "express";
import JobSaveService from "../services/jobSave.service";
import AppError from "../errors/appError";

class JobSaveController {
    private jobSaveService = new JobSaveService();

    /**
     * Get all saved jobs for authenticated user
     */
    getSavedJobs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const result = await this.jobSaveService.getSavedJobs(userId, page, limit);

            res.status(200).json({
                success: true,
                message: "Saved jobs retrieved successfully",
                data: result.data,
                pagination: result.pagination,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Save a job
     */
    saveJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const { job_id } = req.body;

            if (!job_id) {
                throw new AppError("Job ID is required", 400);
            }

            const savedJob = await this.jobSaveService.saveJob(userId, job_id);

            res.status(201).json({
                success: true,
                message: "Job saved successfully",
                data: savedJob,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Unsave a job
     */
    unsaveJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const jobId = parseInt(req.params.jobId);

            if (isNaN(jobId)) {
                throw new AppError("Invalid job ID", 400);
            }

            await this.jobSaveService.unsaveJob(userId, jobId);

            res.status(200).json({
                success: true,
                message: "Job unsaved successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Check if job is saved by user
     */
    checkJobSaved = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const jobId = parseInt(req.params.jobId);

            if (isNaN(jobId)) {
                throw new AppError("Invalid job ID", 400);
            }

            const isSaved = await this.jobSaveService.checkJobSaved(userId, jobId);

            res.status(200).json({
                success: true,
                message: "Job save status checked",
                data: { isSaved },
            });
        } catch (error) {
            next(error);
        }
    };
}

export default JobSaveController;
