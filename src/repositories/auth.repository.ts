import { email } from "zod";
import { Role } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import { SignUpDTO, SignUpGoogleDTO } from "../dto/auth.dto";
import { hashPassword } from "../utils/hash";
import { profile } from "console";

export const createAccount = async (data: SignUpDTO) => {
  const user = await prisma.users.create({
    data: {
      ...data,
      password: await hashPassword(data.password),
    },
  });

  return user;
};
export const updateAccountRegis = async (data: SignUpDTO) => {
  return await prisma.users.update({
    where: { email: data.email },
    data: { ...data, password: await hashPassword(data.password) },
  });
};
export const findUser = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};
export const findUserByUsername = async (username: string) => {
  return await prisma.users.findUnique({
    where: { username },
  });
};
export const createRoleUserProfile = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.users.update({
      where: {
        user_id: id,
      },
      data: { isVerfied: true },
    });
    if (!user) return;
    const userProfile = await tx.profiles.create({
      data: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
      },
    });
    return userProfile;
  });
};
export const createRoleUserCompany = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.users.update({
      where: {
        user_id: id,
      },
      data: { isVerfied: true },
    });
    if (!user) return;
    const userCompany = await tx.companies.create({
      data: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
      },
    });
    return userCompany;
  });
};
export const resetPassword = async (id: number, password: string) => {
  return await prisma.users.update({
    where: { user_id: id },
    data: { password: await hashPassword(password) },
  });
};
export const createAccountWithGoogle = async (data: SignUpGoogleDTO) => {
  return await prisma.$transaction(async (tx) => {
    console.log("run");
    const newUser = await tx.users.create({
      data: {
        name: data.name,
        email: data.email,
        username: data.email.split("@")[0],
        role: data.role,
        googleId: data.googleId,
        isVerfied: true,
      },
    });
    if (newUser.role === Role.USER) {
      await tx.profiles.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          profile_picture: data.profile_picture,
          user_id: newUser.user_id,
        },
      });
    } else if (newUser.role === Role.COMPANY) {
      await tx.companies.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          profile_picture: data.profile_picture,
          user_id: newUser.user_id,
        },
      });
    }
    return newUser;
  });
};
export const findUserByGoogleId = async (googleId: string) => {
  return await prisma.users.findUnique({
    where: { googleId },
  });
};
export const findUserById = async (id: number) => {
  return await prisma.users.findUnique({
    where: { user_id: id },
  });
};
