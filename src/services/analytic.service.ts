import { JobType } from "../../prisma/generated/client";
import AnalyticRepository from "../repositories/analytic.repositories";
import { getAge } from "../utils/getAge";
import { filterTimeRange } from "../utils/filterTimeRange";

class AnalyticService {
  private analyticRepository = new AnalyticRepository();

  getUserDemographics = async (
    filters: {
      gender?: "male" | "female";
      range?: "7d" | "month" | "year" | "all";
    } = {}
  ) => {
    const { gender, range } = filters;

    // ambil semua user
    let allUsers = await this.analyticRepository.getAllUsers();

    // filter gender and date
    allUsers = allUsers.filter((u) => {
      if (
        gender &&
        gender.toLocaleLowerCase() !==
          u.Users?.profiles?.gender?.toLocaleLowerCase()
      ) {
        return false;
      }
      filterTimeRange(range, u.createdAt);
      return true;
    });

    // bucket umur
    const ageBuckets = {
      "18-24": 0,
      "25-34": 0,
      "35-44": 0,
      "45-54": 0,
      "55+": 0,
    };

    // bucket lokasi
    const locationBucket: Record<string, number> = {};

    allUsers.forEach((user) => {
      // hitung umur
      if (user.Users?.profiles?.birthDate) {
        const age = getAge(user.Users.profiles.birthDate);

        if (age >= 18 && age <= 24) ageBuckets["18-24"]++;
        else if (age >= 25 && age <= 34) ageBuckets["25-34"]++;
        else if (age >= 35 && age <= 44) ageBuckets["35-44"]++;
        else if (age >= 45 && age <= 54) ageBuckets["45-54"]++;
        else if (age >= 55) ageBuckets["55+"]++;
      }

      // hitung lokasi
      const locationStr = user.Jobs?.location;
      if (locationStr) {
        const city = locationStr.split(",")[0].trim().toLowerCase(); // normalisasi
        locationBucket[city] = (locationBucket[city] || 0) + 1;
      }
    });

    // convert ke array of object untuk chart
    const ageData = Object.entries(ageBuckets).map(([range, count]) => ({
      range,
      count,
    }));

    const locationData = Object.entries(locationBucket).map(
      ([city, count]) => ({
        city,
        count,
      })
    );

    return {
      total: allUsers.length,
      ageData, // siap buat bar chart umur
      locationData, // siap buat bar chart/pie chart lokasi
    };
  };

  getSalaryTrends = async (
    filters: {
      jobType?: JobType | "all";
      range?: "7d" | "month" | "year" | "all";
      city?: string;
    } = {}
  ) => {
    // Ambil semua user
    let allUser = await this.analyticRepository.getAllUsers();

    // bucket lokasi

    const cities = Array.from(
      new Set(
        allUser
          .map((user) =>
            user.Jobs?.location?.split(",")[0].trim().toLowerCase()
          )
          .filter(Boolean)
      )
    );

    // Filter data
    allUser = allUser.filter((user) => {
      // filter jobType
      if (filters.jobType && filters.jobType !== "all") {
        if (user.Jobs?.job_type !== filters.jobType) {
          return false;
        }
      }
      if (
        filters.city &&
        filters.city !== "all" &&
        user.Jobs?.location?.split(",")[0].trim().toLowerCase() !==
          filters.city.toLocaleLowerCase()
      ) {
        return false;
      }
      // filter date
      filterTimeRange(filters.range, user.createdAt);
      return true;
    });

    // Bucket per category
    const categorySalary: Record<string, { total: number; count: number }> = {};

    allUser.forEach((user) => {
      const salary = user.expected_salary;
      const category = user.Jobs?.category;

      if (salary && category) {
        if (!categorySalary[category]) {
          categorySalary[category] = { total: salary, count: 1 };
        } else {
          categorySalary[category].total += salary;
          categorySalary[category].count += 1;
        }
      }
    });

    // Hitung rata-rata per category
    const result = Object.entries(categorySalary).map(
      ([category, { total, count }]) => ({
        category,
        avgSalary: total / count,
      })
    );

    console.log("after filter", { result, cities });
    return { result, cities }; // array of { category, avgSalary }
  };

  getMostJobType = async (
    filters: {
      range?: "7d" | "month" | "year" | "all";
    } = {}
  ) => {
    let allUser = await this.analyticRepository.getAllUsers();

    const jobTypeCounts: Record<string, number> = {};

    Object.values(JobType).forEach((name) => {
      jobTypeCounts[name] = 0;
    });
    allUser = allUser.filter((user) => {
      filterTimeRange(filters.range, user.createdAt);
      return true;
    });
    allUser.forEach((user) => {
      const jobTypeDB = user.Jobs?.job_type;
      if (jobTypeDB && jobTypeDB in jobTypeCounts) {
        jobTypeCounts[jobTypeDB] += 1;
      }
    });
    const jobTypeArray = Object.entries(jobTypeCounts).map(
      ([jobType, count]) => ({
        jobType,
        count,
      })
    );
    return jobTypeArray;
  };
}

export default AnalyticService;
