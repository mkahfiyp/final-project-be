import { DegreeLevel } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import { EducationDTO, UpdateProfileRoleUserDto } from "../dto/account.dto";

class AccountRepository {
  getDataRoleUser = async (id: number) => {
    return await prisma.users.findUnique({
      where: { user_id: id },
      include: {
        profiles: true,
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
  createEducation = async (data: EducationDTO, id: number) => {
    return await prisma.education.create({
      data: { ...data, user_id: id, degree: data.degree as DegreeLevel },
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
  editEducation = async (data: EducationDTO, education_id: number) => {
    return await prisma.education.update({
      where: { education_id },
      data: {
        ...data,
        degree: data.degree as DegreeLevel,
      },
    });
  };
  getProfileByUsername = async (username: string) => {
    return await prisma.users.findUnique({
      where: { username },
      include: {
        profiles: true,
        education: true,
        experience: true,
        user_assessment: {
          include: {
            assessment: true,
            assessment_certificates: true
          }
        }
      },
    });
  };
  searchUsersByName = async (searchTerm: string) => {
    return await prisma.users.findMany({
      where: {
        OR: [
          {
            username: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            profiles: {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          }
        ]
      },
      include: {
        profiles: true,
      },
      take: 10 // Limit results to 10 users
    });
  };
}
export default AccountRepository;
