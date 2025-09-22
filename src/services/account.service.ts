import { EducationDTO, UpdateProfileRoleUserDto } from "../dto/account.dto";
import AppError from "../errors/appError";
import AccountRepository from "../repositories/account.repository";

class AccountService {
  private accountRepository = new AccountRepository();

  getDataRoleUser = async (id: number) => {
    const data = await this.accountRepository.getDataRoleUser(id);
    if (!data) {
      throw new AppError("cannot get data", 500);
    }
    return data;
  };
  updateProfileRoleUser = async (
    id: number,
    data: UpdateProfileRoleUserDto
  ) => {
    const result = await this.accountRepository.updateProfileRoleUser(id, data);
    if (!result) {
      throw new AppError("faild update profile", 200);
    }
    return result;
  };
  createEducation = async (data: EducationDTO, id: number) => {
    const result = await this.accountRepository.createEducation(data, id);
    if (!result) {
      throw new AppError("faild create", 500);
    }
    return result;
  };
  getEducationList = async (id: number) => {
    const result = await this.accountRepository.getEducationList(id);
    if (!result) {
      throw new AppError("faild get education list", 500);
    }
    return result;
  };
  getDetailEducation = async (education_id: number) => {
    const result = await this.accountRepository.getEducationById(education_id);
    if (!result) {
      throw new AppError("data not found", 400);
    }
    return result;
  };
  editEducation = async (data: EducationDTO, education_id: number) => {
    const result = await this.accountRepository.editEducation(
      data,
      education_id
    );
    if (!result) {
      throw new AppError("faild edit education", 500);
    }
    return result;
  };
  getProfileByUsername = async (username: string) => {
    const result = await this.accountRepository.getProfileByUsername(username);
    if (!result) {
      throw new AppError("User not found", 404);
    }
    return result;
  };
  searchUsersByName = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      throw new AppError("Search term must be at least 2 characters", 400);
    }
    const result = await this.accountRepository.searchUsersByName(searchTerm.trim());
    return result;
  };

  getDataForCvGenerator = async (id: number) => {
    const result = await this.accountRepository.getDataForCvGenerator(id);
    return result;
  }
}

export default AccountService;
