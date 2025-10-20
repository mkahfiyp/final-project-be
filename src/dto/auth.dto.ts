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
export interface SignUpGoogleDTO {
  name: string;
  email: string;
  profile_picture: string | null;
  role: Role;
  googleId: string;
}
