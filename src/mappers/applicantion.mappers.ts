import { Gender, Status } from "../../prisma/generated/client";

// Type untuk profile user
export type ApplicantProfile = {
  profile_id: number;
  user_id: number | null;
  name: string;
  email: string;
  phone: string | null;
  profile_picture: string | null;
  birthDate: Date | null;
  gender: Gender | null;
  address: string | null;
};

// Type untuk pendidikan user
export type ApplicantEducation = {
  user_id: number | null;
  education_id: number;
  description: string | null;
  university: string;
  degree: string; // $Enums.DegreeLevel
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date | null;
};

// Type untuk user selection
export type UserSelection = {
  user_id: number;
  score: number | null;
  user_selection_id: number;
  selection_id: number;
  startedAt: Date;
  completedAt: Date | null;
};

// Type untuk user
export type ApplicantUser = {
  name: string;
  email: string;
  profiles: ApplicantProfile | null;
  education: ApplicantEducation[];
  user_selection: UserSelection[];
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

// Mapping function
export const getJobApplicantListMap = (
  data: ApplicantList
): ApplicantFrontend[] => {
  return data.map((d) => {
    const user = d.Users;

    // Ambil latest score
    const latestScore =
      user?.user_selection && user.user_selection.length > 0
        ? user.user_selection[0].score
        : null;

    // Hitung umur
    const birthDate = user?.profiles?.birthDate;
    const age = birthDate
      ? Math.floor(
          (new Date().getTime() - new Date(birthDate).getTime()) /
            (1000 * 60 * 60 * 24 * 365.25)
        )
      : null;

    // Ambil pendidikan terakhir (urut berdasarkan endDate paling baru)
    const lastEducation =
      user?.education && user.education.length > 0
        ? user.education
            .filter((e) => e.endDate)
            .sort((a, b) => b.endDate!.getTime() - a.endDate!.getTime())[0]
        : null;

    return {
      application_id: d.application_id,
      name: user?.name,
      email: user?.email,
      appliedOn: d.createdAt,
      profile_picture: user?.profiles?.profile_picture ?? null,
      score: latestScore,
      status: d.status,
      expected_salary: d.expected_salary,
      education: lastEducation
        ? `${lastEducation.degree} - ${lastEducation.university}`
        : null,
      age,
      cvUrl: d.cv,
    };
  });
};
