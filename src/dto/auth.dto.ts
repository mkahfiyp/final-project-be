import { Role } from "../../prisma/generated/client";

export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignUpDTO {
  name: string;
  username: string;
  email: string;
  role: Role;
  password: string;
}