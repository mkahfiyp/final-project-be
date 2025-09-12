import { Gender, Status } from "../../prisma/generated/client";

// Type untuk profile user
export type ApplicantProfile = {
  profile_id: number;
  user_id: number | null;
  name: string;
  email: string;
  education: string | null;
  phone: string | null;
  profile_picture: string | null;
  birthDate: Date | null;
  gender: Gender | null;
  address: string | null;
};

// Type untuk user
export type ApplicantUser = {
  name: string;
  email: string;
  profiles: ApplicantProfile | null;
  user_selection: {
    user_id: number;
    score: number | null;
    user_selection_id: number;
    selection_id: number;
    startedAt: Date;
    completedAt: Date | null;
  }[];
};

// Type raw dari database
export type Applicant = {
  application_id: number;
  job_id: number | null;
  user_id: number | null;
  expected_salary: number;
  cv: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  Users: ApplicantUser | null;
};

// Type array applicant
export type ApplicantList = Applicant[];

// Type untuk frontend / mapping result
export type ApplicantFrontend = {
  application_id: number;
  name: string | undefined;
  email: string | undefined;
  appliedOn: Date;
  profile_picture: string | null;
  score: number | null;
  status: Status;
  expected_salary: number;
  education: string | null;
  age: number | null;
  cvUrl: string;
};

export const getJobApplicantListMap = (
  data: ApplicantList
): ApplicantFrontend[] => {
  return data.map((d) => {
    const userSelection = d.Users?.user_selection ?? [];
    const latestScore =
      userSelection.length > 0 ? userSelection[0].score : null;

    const birthDate = d.Users?.profiles?.birthDate;
    const age = birthDate
      ? Math.floor(
          (new Date().getTime() - new Date(birthDate).getTime()) /
            (1000 * 60 * 60 * 24 * 365.25)
        )
      : null;

    return {
      application_id: d.application_id,
      name: d.Users?.name,
      email: d.Users?.email,
      appliedOn: d.createdAt,
      profile_picture: d.Users?.profiles?.profile_picture ?? null,
      score: latestScore,
      status: d.status,
      expected_salary: d.expected_salary,
      education: d.Users?.profiles?.education ?? null,
      age,
      cvUrl: d.cv,
    };
  });
};
