import { email } from "zod";
import { Role } from "../../prisma/generated/client";

type UserWithCompanyProfile = {
  user_id: number;
  username: string;
  email: string;
  name: string;
  role: Role;
  isVerfied: boolean;
  companies: {
    user_id: number;
    email: string;
    name: string;
    phone: string | null;
    profile_picture: string | null;
    description: string | null;
    website: string | null;
    company_id: number;
  } | null;
};

export const companyProfileMap = (data: UserWithCompanyProfile) => {
  return {
    name: data.name,
    email: data.email,
    username: data.username,
    phone: data.companies?.phone,
    profile_picture: data.companies?.profile_picture,
    description: data.companies?.description,
    website: data.companies?.website,
  };
};
