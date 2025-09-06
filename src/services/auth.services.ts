import { compare } from "bcrypt";
import { transport } from "../config/nodemailer";
import { SignInDTO, SignUpDTO } from "../dto/auth.dto";
import AppError from "../errors/appError";
import {
  findUser,
  createAccount,
  updateAccountRegis,
  createRoleUserProfile,
  createRoleUserCompany,
  resetPassword,
} from "../repositories/auth.repository";
import { regisMailTemplate } from "../templates/regist.template";
import { createToken } from "../utils/createToken";
import { Role } from "../../prisma/generated/client";
import { forgetPasswordMail } from "../templates/forgePassword.template";

export const regisService = async (data: SignUpDTO) => {
  let user = await findUser(data.email);

  if (user && user.isVerfied) {
    throw new AppError("the account is already registered!", 409);
  }

  if (user && !user.isVerfied) {
    await updateAccountRegis(data);
  }

  if (!user) {
    user = await createAccount(data);
  }

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
    html: regisMailTemplate(
      data.username,
      urlToFE,
      "http://localhost:3000/images/logo.png"
    ),
  });

  return token;
};

export const SignInService = async (data: SignInDTO) => {
  const { email, password } = data;
  const user = await findUser(email);
  if (!user) {
    throw new AppError("email or password wrong", 402);
  }
  const comparePassword = await compare(password, user.password);
  if (!comparePassword) {
    throw new AppError("email or password wrong", 402);
  }
  return user;
};

export const verifyEmailService = async (id: number, role: Role) => {
  if (role === Role.USER) {
    return await createRoleUserProfile(id);
  } else if (role === Role.COMPANY) {
    return await createRoleUserCompany(id);
  }
};

export const requestForgetPasswordService = async (email: string) => {
  const user = await findUser(email);
  if (!user) {
    throw new AppError("email not found", 400);
  }
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
  const urlToFE = `${process.env.FE_URL}/reset-password/${token}`;

  await transport.sendMail({
    from: process.env.MAILSENDER,
    to: user.email,
    subject: "Forget Password",
    html: forgetPasswordMail(
      user.username,
      urlToFE,
      "http://localhost:3000/images/logo.png"
    ),
  });
  return user;
};
export const resetPasswordService = async (id: number, password: string) => {
  const user = await resetPassword(id, password);
  if (!user) {
    throw new AppError("faild Reset Password", 500);
  }
};
