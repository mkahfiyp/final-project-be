import { ReviewCreateDTO, ReviewUpdateDTO } from "../dto/reviewCompany.dto";
import ReviewRepository from "../repositories/reviewCompany.repository";
class ReviewCompanyService {
    private reviewRepository: ReviewRepository;

    constructor() {
        this.reviewRepository = new ReviewRepository();
    }

    async createReview(reviewData: ReviewCreateDTO) {
        return await this.reviewRepository.createReview(reviewData);
    }

    async getReviewsByCompanyId(companyId: number) {
        return await this.reviewRepository.getReviewsByCompanyId(companyId);
    }

    async updateReview(review_id: number, data: ReviewUpdateDTO) {
        return await this.reviewRepository.updateReview(review_id, data);
    }

    async deleteReview(review_id: number) {
        return await this.reviewRepository.deleteReview(review_id);
    }
}

export default ReviewCompanyService;