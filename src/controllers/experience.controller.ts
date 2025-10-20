import { NextFunction, Request, Response } from "express";
import ExperienceService from "../services/experience.service";
import AppError from "../errors/appError";

class ExperienceController {
    private experienceService = new ExperienceService();

    /**
     * Get all experiences for authenticated user
     */
    getExperiences = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(res.locals.decript.id);
            const experiences = await this.experienceService.getExperiences(userId);

            res.status(200).json({
                success: true,
                message: "Experiences retrieved successfully",
                data: experiences,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Create new experience for authenticated user
     */
    createExperience = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decript.id;
            const experienceData = req.body;

            const experience = await this.experienceService.createExperience(
                experienceData,
                userId
            );

            res.status(201).json({
                success: true,
                message: "Experience created successfully",
                data: experience,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Update experience by ID
     */
    updateExperience = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decript.id;
            const experienceId = parseInt(req.params.id);
            const updateData = req.body;

            if (isNaN(experienceId)) {
                throw new AppError("Invalid experience ID", 400);
            }

            const experience = await this.experienceService.updateExperience(
                experienceId,
                updateData,
                userId
            );

            res.status(200).json({
                success: true,
                message: "Experience updated successfully",
                data: experience,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Delete experience by ID
     */
    deleteExperience = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decript.id;
            const experienceId = parseInt(req.params.id);

            if (isNaN(experienceId)) {
                throw new AppError("Invalid experience ID", 400);
            }

            await this.experienceService.deleteExperience(experienceId, userId);

            res.status(200).json({
                success: true,
                message: "Experience deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}

export default ExperienceController;
