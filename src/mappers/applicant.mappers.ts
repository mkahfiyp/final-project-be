import { FilterApplicant } from "../dto/application.dto";

interface ProcessedApplicant {
  application_id: string;
  name: string;
  email: string;
  profile_picture: string | null;
  age: number | null;
  education: string | null;
  gender?: string;
  score?: number | null;
  cvUrl?: string;
  expected_salary: number;
  status: string;
  appliedOn: string | Date;
}

export const applicantListMap = (
  applicantList: any[],
  filters: FilterApplicant,
  preselection_test: boolean,
  passingScore: number
): ProcessedApplicant[] => {
  return applicantList
    .map((app) => {
      const user = app.Users!;
      const lastEducation = user.education
        .filter((e: any) => e.endDate)
        .sort(
          (a: any, b: any) => b.endDate!.getTime() - a.endDate!.getTime()
        )[0];

      return {
        application_id: app.application_id,
        name: user.name,
        email: user.email,
        profile_picture: user.profiles?.profile_picture ?? null,
        age: user.profiles?.birthDate
          ? Math.floor(
              (Date.now() - new Date(user.profiles.birthDate).getTime()) /
                (1000 * 60 * 60 * 24 * 365.25)
            )
          : null,
        education: lastEducation ? lastEducation.degree ?? null : null,
        gender: user.profiles?.gender,
        score: user.user_selection?.[0]?.score ?? null,
        cvUrl: app.cv,
        expected_salary: app.expected_salary,
        status: app.status,
        appliedOn: app.createdAt,
      };
    })
    .filter((a) => {
      // filter search, age, salary, education, gender
      if (
        filters.search &&
        !a.name?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !a.email?.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;

      if (filters.minAge && (a.age ?? 0) < filters.minAge) return false;
      if (filters.maxAge && (a.age ?? 0) > filters.maxAge) return false;

      if (filters.minSalary && a.expected_salary < filters.minSalary)
        return false;
      if (filters.maxSalary && a.expected_salary > filters.maxSalary)
        return false;

      if (
        filters.education &&
        filters.education !== "all" &&
        a.education !== filters.education
      ) {
        return false;
      }

      if (
        filters.gender &&
        filters.gender !== "all" &&
        a.gender !== filters.gender
      ) {
        return false;
      }

      // **filter preselection test**
      if (preselection_test) {
        if ((a.score ?? 0) < passingScore) return false;
      }

      if (filters.status && a.status !== filters.status) return false;

      return true;
    })
    .sort((a, b) => {
      const order = filters.sortOrder === "desc" ? -1 : 1;
      switch (filters.sortBy) {
        case "score":
          return ((a.score ?? 0) - (b.score ?? 0)) * order;
        case "age":
          return ((a.age ?? 0) - (b.age ?? 0)) * order;
        case "expected_salary":
          return (a.expected_salary - b.expected_salary) * order;
        case "appliedOn":
        default:
          return (
            (new Date(a.appliedOn).getTime() -
              new Date(b.appliedOn).getTime()) *
            order
          );
      }
    });
};
