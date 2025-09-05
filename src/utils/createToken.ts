import { sign } from "jsonwebtoken";
import { Role } from "../../prisma/generated/client";

interface ICreateToken {
  id: number;
  isVerified: boolean;
  role: Role;
}

export const createToken = (user: ICreateToken, expiresIn: any) => {
  const token = sign(
    { id: user.id, isVerified: user.isVerified, role: user.role },
    process.env.TOKEN_KEY || "secret",
    { expiresIn }
  );
  return token;
};
