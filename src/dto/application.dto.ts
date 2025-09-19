import { Status } from "../../prisma/generated/client";

export interface FilterApplicant {
  search?: string;
  minAge?: number;
  maxAge?: number;
  minSalary?: number;
  maxSalary?: number;
  education?: string;
  gender?: string;
  status?: Status;
  sortBy?: "appliedOn" | "score" | "age" | "expected_salary";
  sortOrder?: "asc" | "desc";
}

export interface SubmitPreselectionTest {
  selection_id: number;
  user_id: number;
  score: number;
}
