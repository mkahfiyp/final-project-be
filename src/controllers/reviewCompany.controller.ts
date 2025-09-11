import { NextFunction, Request, Response } from "express";
import ReviewCompanyService from "../services/reviewCompany.service";
import { sendResponse } from "../utils/sendResponse";
import { ReviewCreateSchema, ReviewUpdateSchema } from "../dto/reviewCompany.dto";

class ReviewCompanyController {
    private reviewCompanyService: ReviewCompanyService;

    constructor() {
        this.reviewCompanyService = new ReviewCompanyService();
    }

    createReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(res.locals.decript.id);
            const companyId = Number(req.params.companyId);

            const validatedData = ReviewCreateSchema.parse({
                ...req.body,
                company_id: companyId,
            });

            const result = await this.reviewCompanyService.createReview(userId, validatedData);
            sendResponse(res, "Review created successfully", 201, result);
        } catch (error) {
            next(error);
        }
    };

    getReviewsByCompanyId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const companyId = Number(req.params.companyId);
            const result = await this.reviewCompanyService.getReviewsByCompanyId(companyId);
            sendResponse(res, "Reviews retrieved successfully", 200, result);
        } catch (error) {
            next(error);
        }
    };

    updateReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(res.locals.decript.id);
            const reviewId = Number(req.params.reviewId);

            const validatedData = ReviewUpdateSchema.parse(req.body);

            const result = await this.reviewCompanyService.updateReview(reviewId, userId, validatedData);
            sendResponse(res, "Review updated successfully", 200, result);
        } catch (error) {
            next(error);
        }
    };

    deleteReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(res.locals.decript.id);
            const reviewId = Number(req.params.reviewId);

            await this.reviewCompanyService.deleteReview(reviewId, userId);
            sendResponse(res, "Review deleted successfully", 200, null);
        } catch (error) {
            next(error);
        }
    };
}

export default ReviewCompanyController;