import { prisma } from "../config/prisma";

export const FindUser = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};
