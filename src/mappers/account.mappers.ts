import { Gender, Role } from "../../prisma/generated/client";

type UserWithProfile = {
  user_id: number;
  username: string;
  email: string;
  name: string;
  role: Role;
  isVerfied: boolean;
  profiles: {
    profile_id: number;
    birthDate: Date | null;
    gender: Gender | null;
    address: string | null;
    phone: string | null;
    profile_picture: string | null;
  } | null;
};

export const dataRoleUserMap = (user: UserWithProfile) => {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    birthDate: user.profiles?.birthDate || null,
    gender: user.profiles?.gender || null,
    address: user.profiles?.address || null,
    phone: user.profiles?.phone || null,
    profile_picture: user.profiles?.profile_picture || null,
  };
};
