import { prisma } from "../config/prisma";
import { SignUpDTO } from "../dto/auth.dto";
import { hashPassword } from "../utils/hash";

export const createAccount = async (data: SignUpDTO) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.users.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      },
    });

    if (data.role === "COMPANY") {
      await tx.companies.create({
        data: {
          name: data.name,
          email: data.email,
          user_id: user.user_id,
        },
      });
    } else {
      await tx.profiles.create({
        data: {
          name: data.name,
          email: data.email,
          user_id: user.user_id,
        },
      });
    }

    return user;
  });
};

export const FindUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};

export const findUserByUsername = async (username: string) => {
  return await prisma.users.findUnique({
    where: { username },
  });
};
