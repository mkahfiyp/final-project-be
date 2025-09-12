import { email } from "zod";
import { Gender, Status } from "../../prisma/generated/client";
import { application } from "express";

type ApplicantProfile = {
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
type ApplicantUser = {
  name: string;
  email: string;
  profiles: ApplicantProfile | null;
};

type Applicant = {
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

export type ApplicantList = Applicant[];

export const getJobApplicantListMap = (data: ApplicantList) => {
  return data.map((d) => {
    return {
      application_id: d.application_id,
      name: d.Users?.name,
      email: d.Users?.email,
      appliedOn: d.createdAt,
      score: d.Users?.profiles?.profile_picture,
      status: d.status,
    };
  });
};
