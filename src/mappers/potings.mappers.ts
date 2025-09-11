type Job = {
  myJobs: {
    data: {
      requirements: string[];
      updatedAt: Date;
      deletedAt: Date | null;
      slug: string;
      title: string;
      description: string;
      category: string;
      latitude: string;
      longitude: string;
      location: string;
      salary: number;
      periodSalary: string;
      currency: string;
      job_type: string;
      preselection_test: boolean;
      expiredAt: Date;
      createdAt: Date;
      company_id: number | null;
    }[];
    totalJobs: number;
    totalPage: number;
    categories: string[];
  };
};

export const getMyJobListMap = (jobs: Job["myJobs"]) => {
  return {
    ...jobs,
    data: jobs.data.map(
      ({ latitude, longitude, description, ...rest }) => rest
    ),
  };
};
