import { compare } from "bcrypt";
import { transport } from "../config/nodemailer";
import { SignInDTO, SignUpDTO } from "../dto/auth.dto";
import AppError from "../errors/appError";
import { FindUser, createAccount, updateAccountRegis } from "../repositories/auth.repository";
import { regisMailTemplate } from "../templates/regist.template";
import { createToken } from "../utils/createToken";

export const regisService = async (data: SignUpDTO) => {
  let user = await FindUser(data.email);
  if (user && user.isVerfied) {
    throw new AppError("Account sudah terdaftar", 409);
  }

  if (user && !user.isVerfied) {
    user = await updateAccountRegis(data);
  }

  if (!user) {
    user = await createAccount(data);
  }

  //  Create token for verify
  const token = createToken(user, "15m");

  // Define url to front end verify page
  const urlToFE = `${process.env.FE_URL}/verify/${token}`;

  await transport.sendMail({
    from: process.env.MAILSENDER,
    to: data.email,
    subject: "Verifikasi email",
    html: regisMailTemplate(data.username, urlToFE),
  });

  return user;
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
