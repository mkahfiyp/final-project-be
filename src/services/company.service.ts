import AppError from "../errors/appError";
import { SchemaUpdateCompanyProfile } from "../middleware/validation/company.validation";
import CompanyRepository from "../repositories/company.repository";

class CompanyService {
  private companyRepository = new CompanyRepository();
  getCompanyProfile = async (user_id: number) => {
    const result = await this.companyRepository.getCompanyProfile(user_id);
    if (!result) {
      throw new AppError("faild get data", 500);
    }
    return result;
  };
  updateCompanyProfile = async (
    user_id: number,
    data: SchemaUpdateCompanyProfile,
    uploadedPicture?: string
  ) => {
    const result = await this.companyRepository.updateCompanyProfile(
      user_id,
      data,
      uploadedPicture
    );
    if (!result) {
      throw new AppError("faild update company profile", 500);
    }
    return result;
  };

  getAllCompanies = async (filters: {
    page: number;
    limit: number;
    search: string;
  }) => {
    const result = await this.companyRepository.getAllCompanies(filters);
    const totalPage = Math.ceil(result.totalCompanies / filters.limit);

    return {
      data: result.data,
      totalCompanies: result.totalCompanies,
      totalPage,
      currentPage: filters.page,
    };
  };

  getCompanyById = async (companyId: number) => {
    const result = await this.companyRepository.getCompanyById(companyId);
    return result;
  };

  getCompanyByName = async (name: string) => {
    return await this.companyRepository.getCompanyByName(name);
  };

  getTopCompanies = async (limit: number = 10) => {
    const companies = await this.companyRepository.getTopCompanies(limit);

    // Transform the data to include total application counts
    const transformedCompanies = companies.map((company) => {
      const totalApplications = company.job.reduce((sum, job) => {
        return sum + job._count.applications;
      }, 0);

      return {
        company_id: company.company_id,
        name: company.name,
        email: company.email,
        phone: company.phone,
        description: company.description,
        website: company.website,
        profile_picture: company.profile_picture,
        activeJobsCount: company._count.job,
        totalApplications,
      };
    });

    return transformedCompanies;
  };

  getTopCompaniesWithStats = async (limit: number = 10) => {
    const companies = await this.companyRepository.getTopCompaniesWithStats(
      limit
    );

    const transformedCompanies = companies.map((company) => {
      const now = new Date();

      // Calculate job statistics
      const activeJobs = company.job.filter(
        (job) => !job.deletedAt && job.expiredAt > now
      );

      // Calculate application statistics
      const totalApplications = company.job.reduce(
        (sum, job) => sum + job._count.applications,
        0
      );

      // Calculate application status distribution
      const applicationsByStatus = company.job.reduce((acc, job) => {
        job.applications.forEach((app) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>);

      // Calculate success rate (accepted + interview applications / total applications)
      const acceptedApplications = applicationsByStatus["ACCEPTED"] || 0;
      const interviewApplications = applicationsByStatus["INTERVIEW"] || 0;
      const successRate =
        totalApplications > 0
          ? (acceptedApplications + interviewApplications) / totalApplications
          : 0;

      // Calculate review statistics
      // Get all user_companies for this company
      const userCompanies = company.user_company;

      // Count reviews from Reviews table based on user_company_id
      const reviews = userCompanies
        .filter((uc) => uc.reviews !== null)
        .map((uc) => uc.reviews);

      const totalReviews = reviews.length;
      let averageRating = 0;

      if (totalReviews > 0) {
        const totalRatingSum = reviews.reduce((sum, review) => {
          if (review) {
            return (
              sum +
              review.rating_culture +
              review.rating_work_life_balance +
              review.rating_facilities +
              review.rating_career
            );
          }
          return sum;
        }, 0);

        // Average of all 4 rating categories, divided by number of reviews
        averageRating = totalRatingSum / (totalReviews * 4);
        averageRating = Math.round(averageRating * 10) / 10; // Round to 1 decimal place
      }

      return {
        company_id: company.company_id,
        name: company.name,
        profile_picture: company.profile_picture,
        teamStats: {
          total_employees: company._count.user_company,
        },
        jobStats: {
          active_jobs: activeJobs.length,
          total_jobs: company._count.job,
        },
        engagementStats: {
          average_rating: averageRating,
          total_reviews: totalReviews,
        },
        applicationStats: {
          total_applications: totalApplications,
          success_rate: Math.round(successRate * 100) / 100, // Round to 2 decimal places
        },
      };
    });

    return transformedCompanies;
  };

  getFindCompany = async (filters: {
    page: number;
    limit: number;
    search: string;
    location: string;
  }) => {
    return await this.companyRepository.getFindCompany(filters);
  };
}

export default CompanyService;
