import { compare } from "bcrypt";
import { transport } from "../config/nodemailer";
import { SignInDTO } from "../dto/auth.dto";
import AppError from "../errors/appError";
import { FindUser, createAccount } from "../repositories/auth.repository";
import { regisMailTemplate } from "../templates/regist.template";
import { createToken } from "../utils/createToken";

export const regisService = async (data: any) => {
    const newUser = await createAccount(data);

    //  Create token for verify
    const token = createToken(newUser, "15m");

    // Define url to front end verify page
    const urlToFE = `${process.env.FE_URL}/verify/${token}`;
    
    await transport.sendMail({
        from: process.env.MAILSENDER,
        to: data.email,
        subject: "Verifikasi email",
        html: regisMailTemplate(data.username, urlToFE),
    });

    return newUser;
};

export const SignInService = async (data: SignInDTO) => {
  const { email, password } = data;
  const user = await FindUser(email);
  if (!user) {
    throw new AppError("Account not exist", 400);
  }

  const comparePassword = await compare(password, user.password);
  if (!comparePassword) {
    throw new AppError("Invalid Password", 400);
  }
  
  return user;
};
