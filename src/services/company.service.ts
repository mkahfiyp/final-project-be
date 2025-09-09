import AppError from "../errors/appError";
import { SchemaUpdateCompanyProfile } from "../middleware/validation/company.validation";
import CompanyRepository from "../repositories/company.repository";

class CompanyService {
  private companyRepository = new CompanyRepository();
  getCompanyProfile = async (user_id: number) => {
    const result = await this.companyRepository.getCompanyProfile(user_id);
    if (!result) {
      throw new AppError("faild get data", 500);
    }
    return result;
  };
  updateCompanyProfile = async (
    user_id: number,
    data: SchemaUpdateCompanyProfile,
    uploadedPicture?: string
  ) => {
    const result = await this.companyRepository.updateCompanyProfile(
      user_id,
      data,
      uploadedPicture
    );
    if (!result) {
      throw new AppError("faild update company profile", 500);
    }
    return result;
  };
}

export default CompanyService;
