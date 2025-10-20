import { prisma } from "../config/prisma";
import { SubmitPreselectionTest } from "../dto/application.dto";
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
      orderBy: { createAt: "desc" },
    });
  };
  updatePreselectionTest = async (
    selection_id: number,
    data: PreselectionInput
  ) => {
    return await prisma.$transaction(async (tx) => {
      const { passingScore, ...question } = data;
      const updatedSelection = await tx.selections.update({
        where: { selection_id },
        data: {
          passingScore,
        },
      });
      await tx.selectionQuestions.deleteMany({
        where: { selection_id },
      });
      await tx.selectionQuestions.createMany({
        data: question.questions.map((q) => ({
          selection_id,
          question: q.question,
          option_A: q.option_A,
          option_B: q.option_B,
          option_C: q.option_C,
          option_D: q.option_D,
          correct_option: q.correct_option,
        })),
      });

      return updatedSelection;
    });
  };
  deactivePreselectionTest = async (slug: string) => {
    return prisma.jobs.update({
      where: {
        slug,
      },
      data: { preselection_test: false },
    });
  };
  checkIsExist = async (job_id: number) => {
    return await prisma.selections.findUnique({
      where: { job_id },
    });
  };
  createUserSelection = async (data: SubmitPreselectionTest) => {
    return await prisma.userSelection.create({
      data: { ...data },
    });
  };
  checkIfAlreadySubmit = async (user_id: number, selection_id: number) => {
    return await prisma.userSelection.findUnique({
      where: {
        user_id_selection_id: {
          user_id,
          selection_id,
        },
      },
    });
  };
}
export default PreselectionTestRepository;
