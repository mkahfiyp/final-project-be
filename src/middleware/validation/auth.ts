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
