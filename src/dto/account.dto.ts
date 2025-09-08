import { Gender } from "../../prisma/generated/client";

export interface UpdateProfileRoleUserDto {
  name: string;
  birthDate: string;
  gender: Gender;
  phone: string;
  profile_picture: string;
  address: string;
}
