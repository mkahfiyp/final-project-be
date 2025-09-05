import { prisma } from "../config/prisma";
import { SignUpDTO } from "../dto/auth.dto";
import { hashPassword } from "../utils/hash";

export const createAccount = async (data: SignUpDTO) => {
  const user = await prisma.users.create({
    data: {
      ...data, password: await hashPassword(data.password)
    }
  });

  return user;
};

export const updateAccountRegis = async (data: SignUpDTO) => {
  return await prisma.users.update({
    where: { email: data.email },
    data: { ...data, password: await hashPassword(data.password) }
  })
}

export const FindUser = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};

export const findUserByUsername = async (username: string) => {
  return await prisma.users.findUnique({
    where: { username },
  });
};
