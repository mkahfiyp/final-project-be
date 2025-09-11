import { prisma } from "../config/prisma";
import { UserAssessmentCreateDTO } from "../dto/userAssessment.dto";

class UserAssessmentRepository {
    getUserAssessment = async (user_id: number) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return await prisma.userAssessments.findMany({
            where: {
                date_taken: {
                    gte: thirtyDaysAgo,
                },
                user_id
            },
            orderBy: {
                date_taken: 'desc',
            },
        })
    }

    createUserAssessment = async (data: UserAssessmentCreateDTO) => {
        return await prisma.userAssessments.create({ data })
    }
}

export default UserAssessmentRepository;