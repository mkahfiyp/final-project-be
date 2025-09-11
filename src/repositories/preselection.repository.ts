import { prisma } from "../config/prisma";
import { PreselectionInput } from "../middleware/validation/preselection.validation";

class PreselectionTestRepository {
  createPreSelectionTest = async (data: PreselectionInput, slug: string) => {
    const { passingScore, ...question } = data;
    return await prisma.$transaction(async (tx) => {
      const job = await tx.jobs.update({
        where: { slug },
        data: {
          preselection_test: true,
        },
      });
      const result = await tx.selections.create({
        data: { passingScore, job_id: job.job_id },
      });
      await tx.selectionQuestions.createMany({
        data: question.questions.map((q) => ({
          selection_id: result.selection_id,
          question: q.question,
          option_A: q.option_A,
          option_B: q.option_B,
          option_C: q.option_C,
          option_D: q.option_D,
          correct_option: q.correct_option,
        })),
      });
      return result;
    });
  };

  findJobId = async (slug: string) => {
    return await prisma.jobs.findUnique({
      where: { slug },
    });
  };
  getSelectionId = async (job_id: number) => {
    return await prisma.selections.findUnique({
      where: { job_id },
      include: { selection_questions: true },
    });
  };
  getDetailPreselectionTest = async (selection_id: number) => {
    return await prisma.selectionQuestions.findMany({
      where: { selection_id },
    });
  };
  updatePreselectionTest = async (selection_id: number) => {
    return await prisma.$transaction(async (tx) => {
      const result = await tx.selectionQuestions.deleteMany({
        where: {
          selection_id,
        },
      });
    });
  };
}
export default PreselectionTestRepository;
