import { RequestHandler } from "express";
import z from "zod";

const passwordSchema = z
  .string()
  .nonempty("Password required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol");

export const schemaSignUp = z
  .object({
    name: z.string().nonempty("Name required"),
    role: z.enum(["USER", "COMPANY"], "Invalid Role"),
    email: z.email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string().nonempty("Confirm Password required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // kasih error ke field confirmPassword
  });

export const validateSignUp: RequestHandler = (req, res, next) => {
  const result = schemaSignUp.safeParse(req.body.val);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }
  req.body = result.data;
  next();
};

export const schemaSignIn = z.object({
  email: z.email("Invalid email"),
  password: z.string().nonempty("Password required"),
});
