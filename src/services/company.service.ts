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
    console.log(result);
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

  getAllCompanies = async (filters: {
    page: number;
    limit: number;
    search: string;
  }) => {
    const result = await this.companyRepository.getAllCompanies(filters);
    const totalPage = Math.ceil(result.totalCompanies / filters.limit);

    return {
      data: result.data,
      totalCompanies: result.totalCompanies,
      totalPage,
      currentPage: filters.page,
    };
  };

  getCompanyById = async (companyId: number) => {
    const result = await this.companyRepository.getCompanyById(companyId);
    return result;
  };
}

export default CompanyService;
