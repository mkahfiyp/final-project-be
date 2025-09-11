import UserCompanyRepository, { UserCompanyUpdateData } from "../repositories/userCompany.repository";
import AppError from "../errors/appError";
import { prisma } from "../config/prisma";

export interface ServiceUserCompanyCreateDto {
    company_id: number;
    start_date: Date;
    end_date?: Date | null;
}

class UserCompanyService {
    private userCompanyRepository: UserCompanyRepository;

    constructor() {
        this.userCompanyRepository = new UserCompanyRepository();
    }

    async createUserCompany(userId: number, data: ServiceUserCompanyCreateDto) {
        const existingEntry = await prisma.userCompanies.findFirst({
            where: {
                user_id: userId,
                company_id: data.company_id,
            },
        });

        if (existingEntry) {
            throw new AppError("Work history for this company already exists.", 409);
        }

        if (data.end_date && data.start_date > data.end_date) {
            throw new AppError("Start date cannot be after end date.", 400);
        }

        const dataForRepo = {
            user_id: userId,
            company_id: data.company_id,
            start_date: data.start_date,
            end_date: data.end_date ?? undefined,
        };

        return await this.userCompanyRepository.createUserCompany(dataForRepo);
    }

    async getUserCompanies(userId: number) {
        return await this.userCompanyRepository.getUserCompaniesByUserId(userId);
    }

    async updateUserCompany(userCompanyId: number, userId: number, data: UserCompanyUpdateData) {
        return await this.userCompanyRepository.updateUserCompany(userCompanyId, userId, data);
    }

    async deleteUserCompany(userCompanyId: number, userId: number) {
        return await this.userCompanyRepository.deleteUserCompany(userCompanyId, userId);
    }
}

export default UserCompanyService;