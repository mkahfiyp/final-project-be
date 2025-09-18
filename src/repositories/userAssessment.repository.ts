import { prisma } from "../config/prisma";
import { UserAssessmentCreateDTO, UserAssessmentUpdateDTO } from "../dto/userAssessment.dto";

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
            }, include: {
                assessment: true,
                assessment_certificates: true,
            }
        })
    }

    getTime = async () => {
        return await prisma.userAssessments.findFirst({
            where: {
                score: null,
            },
            select: {
                createAt: true,
            },
        });
    }

    createUserAssessment = async (data: UserAssessmentCreateDTO) => {
        return await prisma.userAssessments.create({ data })
    }

    updateUserAssessment = async (data: UserAssessmentUpdateDTO) => {
        return await prisma.userAssessments.update({ where: { user_assessment_id: data.user_assessment_id }, data });
    }
}

export default UserAssessmentRepository;