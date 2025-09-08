import { prisma } from "../config/prisma";
import { AssessmentQuestionInput } from "../dto/questions.dto";
import QuestionRepository from "../repositories/question.repository";

class QuestionService {
    private QuestionRepo = new QuestionRepository();

    getDataByAssessmentId = async (assessment_id: number) => {
        return await this.QuestionRepo.getDataByAssessmentId(assessment_id);
    }

    createQuestionsForAssessment = async (assessment_id: number, items: AssessmentQuestionInput[]) => {
        return await this.QuestionRepo.createQuestionsForAssessment(assessment_id, items);
    };

    deleteAllQuestionsByAssessmentId = async (assessment_id: number) => {
        return await this.QuestionRepo.deleteAllQuestionsByAssessmentId(assessment_id);
    }

    updateQuestions = async (assessment_id: number, questions: AssessmentQuestionInput[]) => {
        const hasAnyId = questions.some(q => q.assessment_question_id);

        if (!hasAnyId) {
            return this.QuestionRepo.createQuestionsForAssessment(assessment_id, questions);
        }

        return prisma.$transaction(async (tx) => {
            const result: any[] = [];

            for (const question of questions) {
                const { assessment_question_id, ...data } = question;
                if (assessment_question_id) {
                    result.push(await this.QuestionRepo.updateOne(tx, assessment_question_id, data));
                } else {
                    result.push(await this.QuestionRepo.createOne(tx, assessment_id, data));
                }
            }

            return result;
        })
    }
}

export default QuestionService;