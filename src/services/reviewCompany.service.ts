import { prisma } from "../config/prisma";
import AppError from "../errors/appError";
import ReviewRepository, { ReviewUpdateData } from "../repositories/reviewCompany.repository";

export interface ServiceReviewCreateDto {
    company_id: number;
    salary_estimate: number;
    rating_culture: number;
    rating_work_life_balance: number;
    rating_facilities: number;
    rating_career: number;
}

class ReviewCompanyService {
    private reviewRepository: ReviewRepository;

    constructor() {
        this.reviewRepository = new ReviewRepository();
    }

    async createReview(userId: number, reviewData: ServiceReviewCreateDto) {
        const userCompany = await prisma.userCompanies.findFirst({
            where: {
                user_id: userId,
                company_id: reviewData.company_id,
            },
        });

        if (!userCompany) {
            throw new AppError("You can only review companies you have worked for.", 403);
        }

        const dataForRepo = {
            user_company_id: userCompany.user_company_id,
            salary_estimate: reviewData.salary_estimate,
            rating_culture: reviewData.rating_culture,
            rating_work_life_balance: reviewData.rating_work_life_balance,
            rating_facilities: reviewData.rating_facilities,
            rating_career: reviewData.rating_career,
        };

        return await this.reviewRepository.createReview(dataForRepo);
    }

    async getReviewsByCompanyId(companyId: number) {
        return await this.reviewRepository.getReviewsByCompanyId(companyId);
    }

    async updateReview(reviewId: number, userId: number, data: ReviewUpdateData) {
        return await this.reviewRepository.updateReview(reviewId, userId, data);
    }

    async deleteReview(reviewId: number, userId: number) {
        return await this.reviewRepository.deleteReview(reviewId, userId);
    }
}

export default ReviewCompanyService;