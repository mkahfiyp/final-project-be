import { CreateQuestionDTO } from "../dto/questions.dto";
import QuestionRepository from "../repositories/question.repository";

class QuestionService {
    private QuestionRepo = new QuestionRepository();

    getDataByAssessmentId = async (id: number) => {
        return await this.QuestionRepo.getDataByAssessmentId(id);
    }

    createQuestionsForAssessment = async (id: number, items: CreateQuestionDTO[]) => {
        return await this.QuestionRepo.createQuestionAssessment(id, items);
    };
}

export default QuestionService;