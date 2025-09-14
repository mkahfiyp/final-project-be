import { prisma } from "../config/prisma";
import AppError from "../errors/appError";

export interface UserCompanyCreateData {
    user_id: number;
    company_id: number;
    start_date: Date;
    end_date?: Date;
}

export type UserCompanyUpdateData = Partial<Omit<UserCompanyCreateData, 'user_id' | 'company_id'>>;

class UserCompanyRepository {
    async createUserCompany(data: UserCompanyCreateData) {
        return await prisma.userCompanies.create({
            data: {
                user_id: data.user_id,
                company_id: data.company_id,
                start_date: data.start_date,
                end_date: data.end_date,
            },
        });
    }

    async getUserCompaniesByUserId(userId: number) {
        return await prisma.userCompanies.findMany({
            where: {
                user_id: userId,
            },
            include: {
                company: true,
                reviews: true,
            },
            orderBy: {
                start_date: 'desc',
            },
        });
    }

    async findUserCompanyById(userCompanyId: number) {
        return await prisma.userCompanies.findUnique({
            where: {
                user_company_id: userCompanyId,
            },
        });
    }

    async updateUserCompany(userCompanyId: number, userId: number, data: UserCompanyUpdateData) {
        const existingRecord = await prisma.userCompanies.findFirst({
            where: { user_company_id: userCompanyId, user_id: userId }
        });

        if (!existingRecord) {
            throw new AppError("Work history not found or you do not have permission to edit it", 404);
        }

        return await prisma.userCompanies.update({
            where: {
                user_company_id: userCompanyId,
            },
            data: data,
        });
    }

    async deleteUserCompany(user_company_id: number) {
        return await prisma.userCompanies.delete({ where: { user_company_id } });
    }
}

export default UserCompanyRepository;