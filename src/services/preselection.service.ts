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
}

export default PreselectionService;
