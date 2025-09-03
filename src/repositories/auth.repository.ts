import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hash";

export const createAccount = async (data: any) => {
    return prisma.users.create({
        data: {
            ...data, password: await hashPassword(data.password),
        },
    });
};

export const FindUser = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};
