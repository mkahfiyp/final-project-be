import ApplicationRepository from "../repositories/application.repository";
import AppError from "../errors/appError";
import { Status } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import { FilterApplicant } from "../dto/application.dto";
import {
  applicantListMap,
  getDetailApplicantMap,
} from "../mappers/applicant.mappers";
import { transport } from "../config/nodemailer";
import { acceptTemplateMail } from "../templates/accept.template";
import { rejectTemplateMail } from "../templates/reject.template";
class ApplicationService {
  private applicationRepository = new ApplicationRepository();
  createApplication = async (data: {
    user_id: number;
    job_id: number;
    expected_salary: number;
    cv: string;
  }) => {
    // Check if user already applied for this job
    const existingApplication = await prisma.applications.findUnique({
      where: {
        user_id_job_id: {
          user_id: data.user_id,
          job_id: data.job_id,
        },
      },
    });

    if (existingApplication) {
      throw new AppError("You have already applied for this job", 400);
    }
    const job = await prisma.jobs.findUnique({
      where: { job_id: data.job_id },
    });

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.expiredAt < new Date()) {
      throw new AppError("Job application deadline has passed", 400);
    }

    const application = await this.applicationRepository.createApplicant(data);

    return {
      application_id: application.application_id,
      job_title: application.Jobs?.title,
      company_name: application.Jobs?.Companies?.name,
      expected_salary: application.expected_salary,
      status: application.status,
      applied_at: application.createdAt,
    };
  };
  getUserApplications = async (
    user_id: number,
    limit: number,
    offset: number
  ) => {
    const applications = await prisma.applications.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        Jobs: {
          select: {
            title: true,
            location: true,
            salary: true,
            periodSalary: true,
            currency: true,
            expiredAt: true,
            slug: true,
            Companies: {
              select: {
                name: true,
                profile_picture: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    });

    const total = await prisma.applications.count({
      where: {
        user_id: user_id,
      },
    });

    const mappedApplications = applications.map((app) => ({
      application_id: app.application_id,
      job_title: app.Jobs?.title,
      company_name: app.Jobs?.Companies?.name,
      company_logo: app.Jobs?.Companies?.profile_picture,
      location: app.Jobs?.location,
      salary: app.Jobs?.salary,
      periodSalary: app.Jobs?.periodSalary,
      currency: app.Jobs?.currency,
      expected_salary: app.expected_salary,
      status: app.status,
      applied_at: app.createdAt,
      job_expired_at: app.Jobs?.expiredAt,
      job_slug: app.Jobs?.slug,
      cv: app.cv,
    }));

    return {
      data: mappedApplications,
      total,
      limit,
      offset,
    };
  };
  getCompanyApplicant = async (
    slug: string,
    filters: FilterApplicant,
    limit: number,
    offset: number
  ) => {
    const job = await this.applicationRepository.getJobId(slug);
    if (!job) throw new AppError("cannot find job id", 400);
    //ada bug di preselection test true

    const selectionId = await this.applicationRepository.getSelectionId(
      job.job_id
    );

    // if (!selectionId) throw new AppError("cannot find selection id", 400);
    let applicantList = null;
    if (!selectionId) {
      applicantList =
        await this.applicationRepository.getApplicationLlistByJobIdWithoutSelectionTes(
          job.job_id
        );
    } else {
      applicantList = await this.applicationRepository.getApplicantListByJobId(
        job.job_id,
        selectionId.selection_id
      );
    }

    const isPreselectionTrue = job.preselection_test;

    const mappedList = applicantListMap(
      applicantList,
      filters,
      isPreselectionTrue,
      selectionId?.passingScore
    );

    const total = mappedList.length;

    const paginatedList = mappedList.slice(offset, offset + limit);

    return {
      data: paginatedList,
      total,
    };
  };
  getDetailApplication = async (application_id: number) => {
    const user = await this.applicationRepository.getApplicationByApplicantId(
      application_id
    );
    if (!user?.job_id || !user.user_id) {
      throw new AppError("cannot find user", 400);
    }
    let userSelection;
    if (user.Jobs?.selection?.selection_id)
      userSelection = await this.applicationRepository.getUserSelection(
        user.user_id,
        user.Jobs.selection?.selection_id
      );
    const detailApplicant =
      await this.applicationRepository.getDetailApplication(application_id);
    if (!detailApplicant) {
      throw new AppError("cannotn find detail applicant", 400);
    }
    const userCertificate = await this.applicationRepository.getUserCertificate(
      user.user_id
    );
    const afterMap = getDetailApplicantMap(
      detailApplicant,
      userCertificate,
      userSelection
    );
    return afterMap;
  };
  updateStatus = async (
    status: Status,
    application_id: number,
    user_id: number,
    message: string
  ) => {
    const company = await prisma.companies.findUnique({
      where: { user_id },
    });
    if (!company) throw new AppError("cannot find company id", 400);
    const result = await this.applicationRepository.updateStatus(
      status,
      application_id,
      company?.company_id
    );
    if (!result.Users?.email) throw new AppError("faild send email", 500);

    await transport.sendMail({
      from: process.env.MAILSENDER,
      to: result.Users.email,
      subject:
        status === Status.ACCEPTED
          ? `Great News, ${result.Users.name}! You're Accepted`
          : `Application Update for ${result.Users.name}`,
      html:
        status === Status.ACCEPTED
          ? acceptTemplateMail(
              message,
              result.Users?.name,
              `${process.env.FE_URL}/images/logo.png`
            )
          : rejectTemplateMail(
              result.Users.name,
              `${process.env.FE_URL}/images/logo.png`,
              message
            ),
    });
  };
}
export default ApplicationService;
