import { prisma } from "../config/prisma"
import { CreateQuestionDTO } from "../dto/questions.dto"

class QuestionRepository {
    getDataByAssessmentId = async (id: number) => {
        return await prisma.assessmentQuestions.findMany({
            where: {
                assessment_id: id,
            }
        })
    }

    createQuestionAssessment = async (id: number, data: CreateQuestionDTO[]) => {
        const payload = data.map(({ ...rest }) => ({
            ...rest,
            assessment_id: id,
        }));

        return await prisma.assessmentQuestions.createMany({
            data: payload,
            skipDuplicates: true,
        })
    }
}

export default QuestionRepository;