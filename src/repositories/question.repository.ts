import { prisma } from "../config/prisma"
import { AssessmentQuestionInput } from "../dto/questions.dto";

class QuestionRepository {
    getDataAssessment = async () => {
        return await prisma.assessmentQuestions.findMany();
    }

    getDataByAssessmentId = async (assessment_id: number) => {
        return await prisma.assessmentQuestions.findMany({
            where: {
                assessment_id,
            }, orderBy: {
                assessment_question_id: "asc"
            }
        })
    };

    createQuestionsForAssessment = async (assessment_id: number, data: AssessmentQuestionInput[]) => {
        const payload = data.map(({ ...rest }) => ({
            ...rest,
            assessment_id,
        }));

        return await prisma.assessmentQuestions.createMany({
            data: payload,
            skipDuplicates: true,
        })
    }

    deleteAllQuestionsByAssessmentId = async (assessment_id: number) => {
        return await prisma.assessmentQuestions.deleteMany({
            where: {
                assessment_id
            },
        });
    }

    createOne = async (tx: any = prisma, assessment_id: number, data: AssessmentQuestionInput) => {
        return tx.assessmentQuestions.create({ data: { ...data, assessment_id } });
    }

    updateOne = async (tx: any = prisma, assessment_question_id: number, data: AssessmentQuestionInput) => {
        return tx.assessmentQuestions.update({ where: { assessment_question_id }, data })
    }
}

export default QuestionRepository;