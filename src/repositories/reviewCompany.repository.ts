import { prisma } from "../config/prisma";
import { ReviewCreateDTO, ReviewUpdateDTO } from "../dto/reviewCompany.dto";

class ReviewRepository {
    async createReview(data: ReviewCreateDTO) {
        return await prisma.reviews.create({ data });
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

    async updateReview(review_id: number, data: ReviewUpdateDTO) {
        return await prisma.reviews.update({
            where: { review_id, },
            data,
        });
    }

    async deleteReview(review_id: number) {
        return await prisma.reviews.delete({ where: { review_id }, });
    }
}

export default ReviewRepository;