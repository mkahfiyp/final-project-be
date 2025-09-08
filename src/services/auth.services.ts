import { compare } from "bcrypt";
import { transport } from "../config/nodemailer";
import { SignInDTO, SignUpDTO, SignUpGoogleDTO } from "../dto/auth.dto";
import AppError from "../errors/appError";
import {
  findUser,
  createAccount,
  updateAccountRegis,
  createRoleUserProfile,
  createRoleUserCompany,
  resetPassword,
  createAccountWithGoogle,
  findUserByGoogleId,
  findUserById,
} from "../repositories/auth.repository";
import { regisMailTemplate } from "../templates/regist.template";
import { createToken } from "../utils/createToken";
import { Role } from "../../prisma/generated/client";
import { forgetPasswordMail } from "../templates/forgePassword.template";
import { registerGoogleMap } from "../mappers/auth.mappers";
import { schemaDataGoogle } from "../middleware/validation/auth";
import { TokenPayload } from "google-auth-library";

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
  if (!user?.isVerfied || !user) {
    throw new AppError("account not register", 402);
  }
  if (!user?.email) {
    throw new AppError("email or password wrong", 402);
  }
  if (!user.password) {
    throw new AppError("your account register with google", 400);
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
export const registerGoogleService = async (data: TokenPayload, role: Role) => {
  const isExist = await findUserByGoogleId(data.sub);
  if (isExist) {
    return isExist;
  }
  const dataUser = registerGoogleMap(data, role);
  const isValid = schemaDataGoogle.safeParse(dataUser);
  console.log(isValid);
  if (!isValid.success) {
    console.log("run1");
    const message = isValid.error.issues[0].message;
    throw new AppError(message, 400);
  }
  console.log("run");
  const result = await createAccountWithGoogle(dataUser as SignUpGoogleDTO);
  if (!result) {
    throw new AppError("faild create account", 5000);
  }
  return result;
};
export const changePasswordService = async (
  currentPassword: string,
  newPassword: string,
  id: number
) => {
  const user = await findUserById(id);
  if (!user?.password) {
    throw new AppError("please reset your password", 409);
  }
  const comparePassword = await compare(currentPassword, user?.password);
  if (!comparePassword) {
    throw new AppError("password wrong", 400);
  }
  const result = await resetPassword(id, newPassword);
  if (!result) {
    throw new AppError("cannot change password", 500);
  }
  return result;
};
