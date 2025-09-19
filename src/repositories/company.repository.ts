import { prisma } from "../config/prisma";
import { SchemaUpdateCompanyProfile } from "../middleware/validation/company.validation";

class CompanyRepository {
  getCompanyProfile = async (user_id: number) => {
    return await prisma.users.findUnique({
      where: { user_id },
      include: { companies: true },
    });
  };
  updateCompanyProfile = async (
    user_id: number,
    data: SchemaUpdateCompanyProfile,
    uploadedPicture?: string
  ) => {
    return await prisma.companies.update({
      where: { user_id },
      data: {
        ...data,
        profile_picture: uploadedPicture,
      },
    });
  };

  getAllCompanies = async (filters: {
    page: number;
    limit: number;
    search: string;
  }) => {
    const { page, limit, search } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Add search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get companies with count
    const [companies, totalCompanies] = await Promise.all([
      prisma.companies.findMany({
        where,
        select: {
          company_id: true,
          name: true,
          email: true,
          phone: true,
          description: true,
          website: true,
          profile_picture: true,
          user_id: true,
        },
        orderBy: {
          name: 'asc',
        },
        skip,
        take: limit,
      }),
      prisma.companies.count({ where }),
    ]);

    return {
      data: companies,
      totalCompanies,
    };
  };

  getCompanyById = async (companyId: number) => {
    return await prisma.companies.findUnique({
      where: { company_id: companyId },
      select: {
        company_id: true,
        name: true,
        email: true,
        phone: true,
        description: true,
        website: true,
        profile_picture: true,
        job: {
          where: {
            deletedAt: null,
            expiredAt: {
              gte: new Date(), // Only show active jobs
            },
          },
          select: {
            job_id: true,
            title: true,
            slug: true,
            location: true,
            salary: true,
            periodSalary: true,
            currency: true,
            job_type: true,
            category: true,
            createdAt: true,
            expiredAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10, // Limit to latest 10 jobs
        },
      },
    });
  };

  getCompanyByName = async (name: string) => {
    return await prisma.companies.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
      }, include: {
        job: true,
        user_company: true,
        Users: true,
      }
    })
  }

  getTopCompanies = async (limit: number = 10) => {
    return await prisma.companies.findMany({
      select: {
        company_id: true,
        name: true,
        email: true,
        phone: true,
        description: true,
        website: true,
        profile_picture: true,
        _count: {
          select: {
            job: {
              where: {
                deletedAt: null,
                expiredAt: {
                  gte: new Date(), // Only count active jobs
                },
              },
            },
          },
        },
        job: {
          where: {
            deletedAt: null,
            expiredAt: {
              gte: new Date(),
            },
          },
          select: {
            _count: {
              select: {
                applications: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          job: {
            _count: 'desc', // Order by number of active jobs
          },
        },
        {
          name: 'asc', // Secondary sort by name
        },
      ],
      take: limit,
    });
  }

  getTopCompaniesWithStats = async (limit: number = 10) => {
    return await prisma.companies.findMany({
      select: {
        company_id: true,
        name: true,
        email: true,
        phone: true,
        description: true,
        website: true,
        profile_picture: true,
        Users: {
          select: {
            createdAt: true,
          },
        },
        _count: {
          select: {
            job: true, // Total jobs (including expired/deleted)
            user_company: true, // Total employees/users associated
          },
        },
        user_company: {
          select: {
            user_company_id: true,
            reviews: {
              select: {
                review_id: true,
                rating_culture: true,
                rating_work_life_balance: true,
                rating_facilities: true,
                rating_career: true,
              },
            },
          },
        },
        job: {
          select: {
            job_id: true,
            title: true,
            category: true,
            job_type: true,
            salary: true,
            currency: true,
            createdAt: true,
            expiredAt: true,
            deletedAt: true,
            _count: {
              select: {
                applications: true,
                job_save: true,
              },
            },
            applications: {
              select: {
                status: true,
                createdAt: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          job: {
            _count: 'desc',
          },
        },
        {
          name: 'asc',
        },
      ],
      take: limit,
    });
  }
}
export default CompanyRepository;
