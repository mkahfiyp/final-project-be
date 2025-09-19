import AnalyticRepository from "../repositories/analytic.repositories";
import { getAge } from "../utils/getAge";
class AnalyticService {
  private analyticRepository = new AnalyticRepository();

  getUserDemographics = async (
    filter: {
      gender?: "male" | "female";
      range?: "7d" | "month" | "year" | "all";
    } = {}
  ) => {
    const { gender, range } = filter;

    // Range tanggal
    let startDate: Date | undefined;
    let endDate: Date | undefined = new Date();

    const now = new Date();
    if (range === "7d") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
    } else if (range === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (range === "year") {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else if (range === "all") {
      startDate = undefined;
      endDate = undefined;
    }

    // Ambil semua user
    let allUsers = await this.analyticRepository.getAllUsers();

    // Filter gender
    if (gender) {
      allUsers = allUsers.filter(
        (u) => u.Users?.profiles?.gender?.toLowerCase() === gender
      );
    }

    // Filter date
    if (startDate && endDate) {
      allUsers = allUsers.filter((u) => {
        if (!u.createdAt) return false;
        const created = new Date(u.createdAt);
        return created >= startDate && created <= endDate;
      });
    }

    // Hitung umur
    const ageBuckets = {
      "18-24": 0,
      "25-34": 0,
      "35-44": 0,
      "45-54": 0,
      "55+": 0,
    };

    allUsers.forEach((user) => {
      if (!user.Users?.profiles?.birthDate) return;

      const age = getAge(user.Users.profiles.birthDate);

      if (age >= 18 && age <= 24) ageBuckets["18-24"]++;
      else if (age >= 25 && age <= 34) ageBuckets["25-34"]++;
      else if (age >= 35 && age <= 44) ageBuckets["35-44"]++;
      else if (age >= 45 && age <= 54) ageBuckets["45-54"]++;
      else if (age >= 55) ageBuckets["55+"]++;
    });

    // Convert ke array of object untuk chart
    const ageData = Object.entries(ageBuckets).map(([range, count]) => ({
      range,
      count,
    }));

    return {
      total: allUsers.length,
      ageData, // array of object siap chart
    };
  };
}

export default AnalyticService;
