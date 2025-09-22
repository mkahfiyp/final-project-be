import { prisma } from "../config/prisma";
import { SubmitPreselectionTest } from "../dto/application.dto";
import AppError from "../errors/appError";
import { PreselectionInput } from "../middleware/validation/preselection.validation";
import PreselectionTestRepository from "../repositories/preselection.repository";

class PreselectionService {
  private preselectionTestRepository = new PreselectionTestRepository();
  createPreseelctionTest = async (data: PreselectionInput, slug: string) => {
    const result = await this.preselectionTestRepository.createPreSelectionTest(
      data,
      slug
    );
    if (!result) {
      throw new AppError("faild create preselection test", 500);
    }
    return result;
  };
  getDetailPreselectionTest = async (slug: string) => {
    const job = await this.preselectionTestRepository.findJobId(slug);
    if (!job) {
      throw new AppError("cannot  find job_id", 400);
    }
    const selection = await this.preselectionTestRepository.getSelectionId(
      job.job_id
    );
    if (!selection) {
      throw new AppError("cannot find selection id", 400);
    }

    return selection;
  };
  updatePreselectionTest = async (
    selection_id: number,
    data: PreselectionInput
  ) => {
    const result = await this.preselectionTestRepository.updatePreselectionTest(
      selection_id,
      data
    );
    if (!data) {
      throw new AppError("faild update preselection test", 500);
    }
    return result;
  };
  deactivePreselectionTest = async (slug: string) => {
    if (!slug) {
      throw new AppError("slug required", 400);
    }
    const result =
      await this.preselectionTestRepository.deactivePreselectionTest(slug);
    if (!result) {
      throw new AppError("faild deactive", 500);
    }
    return result;
  };
  checkIfAlreadyHavePreselectionTest = async (slug: string) => {
    const result = await this.preselectionTestRepository.findJobId(slug);
    if (!result || result?.deletedAt) {
      throw new AppError("job not exist", 400);
    }
    const selection = await this.preselectionTestRepository.checkIsExist(
      result?.job_id
    );
    if (selection) {
      await prisma.jobs.update({
        where: { job_id: result.job_id },
        data: { preselection_test: true },
      });
      return true;
    }
    return false;
  };
  submitSoal = async (data: SubmitPreselectionTest) => {
    const result = await this.preselectionTestRepository.createUserSelection(
      data
    );
    if (!result) {
      throw new AppError("faild create user selection", 500);
    }
    return result;
  };
  checkIfAlreadySubmit = async (job_id: number, user_id: number) => {
    const selection = await this.preselectionTestRepository.getSelectionId(
      job_id
    );
    if (!selection) throw new AppError("cannot find selection id", 400);
    const result = await this.preselectionTestRepository.checkIfAlreadySubmit(
      user_id,
      selection?.selection_id
    );
    if (!result) {
      throw new AppError("Must Submit Preselection test", 403);
    }
    return result;
  };
}

export default PreselectionService;
