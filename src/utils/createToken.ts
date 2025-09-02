import { sign } from "jsonwebtoken";

export const createToken = (user: any, expiresIn: any) => {
    const token = sign({ id: user.user_id, isVerified: user.isVerfied, role: user.role }, process.env.TOKEN_KEY || "secret", { expiresIn });
    return token;
}