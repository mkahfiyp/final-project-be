export interface FilterApplicant {
  search?: string;
  minAge?: number;
  maxAge?: number;
  minSalary?: number;
  maxSalary?: number;
  education?: string;
  gender?: string;
  sortBy?: "appliedOn" | "score" | "age" | "expected_salary";
  sortOrder?: "asc" | "desc";
}
