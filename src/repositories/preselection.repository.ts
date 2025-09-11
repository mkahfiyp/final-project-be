import slug from "slug";
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
      // cek apakah sudah ada selection sebelumnya
      const existingSelection = await tx.selections.findFirst({
        where: { job_id: job.job_id },
      });
      if (existingSelection) {
        await tx.selectionQuestions.deleteMany({
          where: { selection_id: existingSelection.selection_id },
        });
        await tx.selections.delete({
          where: { selection_id: existingSelection.selection_id },
        });
      }
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
}
export default PreselectionTestRepository;
