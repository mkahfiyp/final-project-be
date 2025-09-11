import { prisma } from "../config/prisma";
import AppError from "../errors/appError";

export interface ReviewCreateData {
    user_company_id: number;
    salary_estimate: number;
    rating_culture: number;
    rating_work_life_balance: number;
    rating_facilities: number;
    rating_career: number;
}

export type ReviewUpdateData = Partial<Omit<ReviewCreateData, 'user_company_id'>>;

class ReviewRepository {
    async createReview(data: ReviewCreateData) {
        const userCompany = await prisma.userCompanies.findUnique({
            where: { user_company_id: data.user_company_id },
        });

        if (!userCompany) {
            throw new AppError("User-Company relation not found", 404);
        }

        return await prisma.reviews.create({
            data: data,
        });
    }

    async getReviewsByCompanyId(companyId: number) {
        return await prisma.reviews.findMany({
            where: {
                user_company: {
                    company_id: companyId,
                },
            },
            include: {
                user_company: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                profiles: {
                                    select: {
                                        profile_picture: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                createAt: "desc",
            },
        });
    }

    async findReviewByIdAndUserId(reviewId: number, userId: number) {
        return await prisma.reviews.findFirst({
            where: {
                review_id: reviewId,
                user_company: {
                    user_id: userId,
                },
            },
        });
    }

    async updateReview(reviewId: number, userId: number, data: ReviewUpdateData) {
        const existingReview = await this.findReviewByIdAndUserId(reviewId, userId);

        if (!existingReview) {
            throw new AppError("Review not found or you do not have permission to edit it", 404);
        }

        return await prisma.reviews.update({
            where: {
                review_id: reviewId,
            },
            data: data,
        });
    }

    async deleteReview(reviewId: number, userId: number) {
        const existingReview = await this.findReviewByIdAndUserId(reviewId, userId);

        if (!existingReview) {
            throw new AppError("Review not found or you do not have permission to delete it", 404);
        }

        return await prisma.reviews.delete({
            where: {
                review_id: reviewId,
            },
        });
    }
}

export default ReviewRepository;