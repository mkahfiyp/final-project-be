import { UpdateProfileRoleUserDto } from "../dto/account.dto";
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
}

export default AccountService;
