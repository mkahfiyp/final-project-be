import { Gender } from "../../prisma/generated/client";

export interface UpdateProfileRoleUserDto {
  name: string;
  birthDate: string;
  gender: Gender;
  phone: string;
  profile_picture: string;
  address: string;
}

export interface CreateEducationDTO {
  university: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}
