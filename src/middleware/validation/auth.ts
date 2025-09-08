import z from "zod";
import { Role } from "../../../prisma/generated/client";

const passwordSchema = z
  .string()
  .nonempty("Password required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol");

export const schemaSignUp = z.object({
  name: z.string().nonempty("Name required"),
  username: z.string().nonempty("Username required"),
  role: z.enum(Role, "Invalid Role"),
  email: z.email("Invalid email address"),
  password: passwordSchema,
});

export const schemaSignIn = z.object({
  email: z.email("Invalid email"),
  password: z.string().nonempty("Password required"),
  remember: z.boolean(),
});
export const schemaForgetPassword = z.object({
  email: z.email("Invalid email"),
});
export const schemaResetPassword = z.object({
  newPassword: passwordSchema,
});
export const schemaGoogleAuth = z.object({
  access_token: z.string().nonempty("access_token required"),
  role: z.enum(["USER", "COMPANY"]),
});

export const schemaDataGoogle = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  profile_picture: z.url().optional(), // karena Google selalu ada, tapi opsional jika nanti ada fallback
  role: z.enum(["USER", "COMPANY"]), // atau z.string() jika bebas
  googleId: z.string().min(1, "Google ID is required"),
});

export const schemaSignGoogle = z.object({
  access_token: z.string().nonempty("access_token required"),
  remember: z.boolean(),
});

export const schemaChangePassword = z.object({
  currentPassword: z.string().nonempty("Password required"),
  newPassword: passwordSchema,
});
