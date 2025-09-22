import ApplicationRepository from "../repositories/application.repository";
import AppError from "../errors/appError";
import { Status } from "../../prisma/generated/client";
import { prisma } from "../config/prisma";
import { FilterApplicant } from "../dto/application.dto";
import { applicantListMap } from "../mappers/applicant.mappers";
import { transport } from "../config/nodemailer";
import { acceptTemplateMail } from "../templates/accept.template";
import { rejectTemplateMail } from "../templates/reject.template";
class ApplicationService {
  private applicationRepository = new ApplicationRepository();
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
    if (!selectionId) throw new AppError("cannot find selection id", 400);

    const isPreselectionTrue = job.preselection_test;

    const applicantList =
      await this.applicationRepository.getApplicantListByJobId(
        job.job_id,
        selectionId.selection_id
      );

    const mappedList = applicantListMap(
      applicantList,
      filters,
      isPreselectionTrue,
      selectionId.passingScore
    );

    const total = mappedList.length;

    const paginatedList = mappedList.slice(offset, offset + limit);

    return {
      data: paginatedList,
      total,
    };
  };
  getDetailApplication = async (application_id: number) => {
    const user = await prisma.applications.findUnique({
      where: { application_id },
    });
    if (!user?.job_id || !user.user_id) {
      throw new AppError("cannot find user", 400);
    }
    const selection = await this.applicationRepository.getSelectionId(
      user?.job_id
    );
    if (!selection || !selection.selection_id) {
      throw new AppError("cannot find selection id", 400);
    }
    const detailApplicant =
      await this.applicationRepository.getDetailApplication(
        application_id,
        selection?.selection_id,
        user.user_id
      );
    if (!detailApplicant) {
      throw new AppError("cannotn find detail applicant", 400);
    }
    const userCertificate = await prisma.userAssessments.findMany({
      where: { user_id: user.user_id },
      include: {
        assessment_certificates: {
          select: {
            certificate_code: true,
          },
        },
      },
    });
    const afterMap = {
      name: detailApplicant.Users?.name,
      email: detailApplicant.Users?.email,
      profile_picture: detailApplicant.Users?.profiles?.profile_picture,
      score: detailApplicant.Users?.user_selection?.[0]?.score ?? null,
      appliedOn: detailApplicant.createdAt,
      phone: detailApplicant.Users?.profiles?.phone,
      address: detailApplicant.Users?.profiles?.address,
      birthDate: detailApplicant.Users?.profiles?.birthDate,
      jobTitle: detailApplicant.Jobs?.title,
      JobType: detailApplicant.Jobs?.job_type,
      jobCategory: detailApplicant.Jobs?.category,
      interview: {
        startDate: detailApplicant.interview?.startDate,
        endDate: detailApplicant.interview?.endDate,
        note: detailApplicant.interview?.note,
        location: detailApplicant.interview?.location,
      },
      status: detailApplicant.status,
      age: detailApplicant.Users?.profiles?.birthDate
        ? Math.floor(
            (Date.now() -
              new Date(detailApplicant.Users.profiles.birthDate).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25)
          )
        : null,
      gender: detailApplicant.Users?.profiles?.gender,
      expectedSalary: detailApplicant.expected_salary,
      cvUrl: detailApplicant.cv,
      education: detailApplicant.Users?.education.map((e) => ({
        university: e.university,
        degree: e.degree,
        fieldOfStudy: e.fieldOfStudy,
        startDate: e.startDate,
        endDate: e.endDate,
        description: e.description,
      })),
      experience: detailApplicant.Users?.experience.map((e) => ({
        name: e.name,
        position: e.position,
        description: e.description,
        startDate: e.startDate,
        endDate: e.endDate,
      })),
      CertificatesCode:
        userCertificate
          ?.map((c) =>
            c.assessment_certificates
              ? { code: c.assessment_certificates.certificate_code }
              : null
          )
          .filter((cert): cert is { code: string } => cert !== null) ?? [],
    };
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
