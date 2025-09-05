import { compare } from "bcrypt";
import { transport } from "../config/nodemailer";
import { SignInDTO, SignUpDTO } from "../dto/auth.dto";
import AppError from "../errors/appError";
import {
  createAccount,
  FindUserByEmail,
  findUserByUsername,
} from "../repositories/auth.repository";
import { regisMailTemplate } from "../templates/regist.template";
import { createToken } from "../utils/createToken";

export const regisService = async (data: SignUpDTO) => {
  const isEmailExist = await FindUserByEmail(data.email);
  if (isEmailExist) {
    throw new AppError("Email Already Exist", 404);
  }
  const isUsernameExist = await findUserByUsername(data.username);
  if (isUsernameExist) {
    throw new AppError("Username Already Exist", 404);
  }
  const user = await createAccount(data);

  //  Create token for verify
  const token = createToken(
    {
      id: user.user_id,
      email: user.email,
      isVerified: user.isVerfied,
      role: user.role,
    },
    "15m"
  );
  if (!token) {
    throw new AppError("server faild create token", 500);
  }
  // Define url to front end verify page
  const urlToFE = `${process.env.FE_URL}/verify/${token}`;

  await transport.sendMail({
    from: process.env.MAILSENDER,
    to: data.email,
    subject: "Verifikasi email",
    html: regisMailTemplate(data.username, urlToFE),
  });

  return token;
};

export const SignInService = async (data: SignInDTO) => {
  const { email, password } = data;
  const user = await FindUserByEmail(email);
  if (!user) {
    throw new AppError("email or password invalid", 402);
  }
  const comparePassword = await compare(password, user.password);
  if (!comparePassword) {
    throw new AppError("email or password invalid", 400);
  }
  return user;
};
