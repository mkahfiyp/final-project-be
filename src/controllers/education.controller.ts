import { NextFunction, Request, Response } from "express";
import EducationService from "../services/education.service";
import AppError from "../errors/appError";

class EducationController {
    private educationService = new EducationService();

    /**
     * Get all educations for authenticated user
     */
    getEducations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const educations = await this.educationService.getEducations(userId);

            res.status(200).json({
                success: true,
                message: "Educations retrieved successfully",
                data: educations,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Create new education for authenticated user
     */
    createEducation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const educationData = req.body;

            const education = await this.educationService.createEducation(
                educationData,
                userId
            );

            res.status(201).json({
                success: true,
                message: "Education created successfully",
                data: education,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Update education by ID
     */
    updateEducation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const educationId = parseInt(req.params.id);
            const updateData = req.body;

            if (isNaN(educationId)) {
                throw new AppError("Invalid education ID", 400);
            }

            const education = await this.educationService.updateEducation(
                educationId,
                updateData,
                userId
            );

            res.status(200).json({
                success: true,
                message: "Education updated successfully",
                data: education,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Delete education by ID
     */
    deleteEducation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.decrypt.id;
            const educationId = parseInt(req.params.id);

            if (isNaN(educationId)) {
                throw new AppError("Invalid education ID", 400);
            }

            await this.educationService.deleteEducation(educationId, userId);

            res.status(200).json({
                success: true,
                message: "Education deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}

export default EducationController;
