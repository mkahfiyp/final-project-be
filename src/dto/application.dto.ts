export interface FilterApplicant {
  minAge?: number;
  maxAge?: number;
  minSalary?: number;
  maxSalary?: number;
  education?: string;
  status?: string;
  sortBy?: "createdAt" | "status" | "score" | "age" | "expected_salary";
  sortOrder?: "asc" | "desc";
}
