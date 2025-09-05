import { Users } from "../../prisma/generated/client";

export const SignInMap = (user: Users) => {
  return {
    username: user.username,
    email: user.email,
    role: user.role,
    isVerified: user.isVerfied,
  };
};
