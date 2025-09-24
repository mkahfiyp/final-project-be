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

type UserWithProfileAndDetails = UserWithProfile & {
  education: any[];
  experience: any[];
  userSkills?: Array<{ skill: { id: number; name: string } }>;
  user_assessment: any[];
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

export const publicProfileMap = (user: UserWithProfileAndDetails) => {
  return {
    name: user.name,
    username: user.username,
    birthDate: user.profiles?.birthDate || null,
    gender: user.profiles?.gender || null,
    email: user.email,
    address: user.profiles?.address || null,
    profile_picture: user.profiles?.profile_picture || null,
    education: user.education || [],
    experience: user.experience || [],
    skills: (user.userSkills || []).map((us: any) => ({
      id: us.skill?.id,
      name: us.skill?.name,
    })),
    user_assessment: (user.user_assessment || []).map(assessment => ({
      user_assessment_id: assessment.user_assessment_id,
      skill_name: assessment.assessment?.skill_name || null,
      score: assessment.score,
      date_taken: assessment.date_taken,
      certificate_code: assessment.assessment_certificates?.certificate_code || null
    }))
  };
};
