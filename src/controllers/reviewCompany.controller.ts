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
            const parsed = ReviewCreateSchema.safeParse(req.body);
            if (!parsed.success) {
                return sendResponse(res, "Validation error", 400, parsed.error.format());
            }
            const result = await this.reviewCompanyService.createReview(parsed.data);
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
            const review_id = Number(req.params.reviewId);
            const parsed = { ...req.body, review_id }

            const validatedData = ReviewUpdateSchema.parse(parsed);
            const result = await this.reviewCompanyService.updateReview(review_id, validatedData);
            sendResponse(res, "Review updated successfully", 200, result);
        } catch (error) {
            next(error);
        }
    };

    deleteReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const review_id = Number(req.params.reviewId);

            await this.reviewCompanyService.deleteReview(review_id);
            sendResponse(res, "Review deleted successfully", 200, null);
        } catch (error) {
            next(error);
        }
    };
}

export default ReviewCompanyController;