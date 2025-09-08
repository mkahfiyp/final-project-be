import { prisma } from "../config/prisma";
import {
  CreateEducationDTO,
  UpdateProfileRoleUserDto,
} from "../dto/account.dto";

class AccountRepository {
  getDataRoleUser = async (id: number) => {
    return await prisma.users.findUnique({
      where: { user_id: id },
      include: {
        profiles: true,
      },
    });
  };
  getDataRoleCompany = async (id: number) => {
    return await prisma.users.findUnique({
      where: { user_id: id },
      include: {
        companies: true,
      },
    });
  };
  updateProfileRoleUser = async (
    id: number,
    data: UpdateProfileRoleUserDto
  ) => {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.users.update({
        where: { user_id: id },
        data: {
          name: data.name,
        },
      });
      await tx.profiles.update({
        where: { user_id: user.user_id },
        data: {
          name: data.name,
          birthDate: new Date(data.birthDate),
          gender: data.gender,
          address: data.address,
          profile_picture: data.profile_picture,
          phone: data.phone,
        },
      });
      return user;
    });
  };
  createEducation = async (data: CreateEducationDTO, id: number) => {
    return await prisma.education.create({
      data: { ...data, user_id: id },
    });
  };
  getEducationList = async (id: number) => {
    return await prisma.education.findMany({
      where: { user_id: id },
      omit: { user_id: true },
    });
  };
  getEducationById = async (education_id: number) => {
    return await prisma.education.findUnique({
      where: { education_id },
      omit: { user_id: true },
    });
  };
}
export default AccountRepository;
