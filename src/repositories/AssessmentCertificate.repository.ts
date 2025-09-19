import { prisma } from "../config/prisma";
import { AssessmentCertificateCreateDTO } from "../dto/AssessmentCertificate.dto";

class AssessmentCertificateRepository {
    createAssessmentCertificate = async (data: AssessmentCertificateCreateDTO) => {
        return await prisma.assessmentCertificates.create({ data });
    }

    getAssessmentCertificate = async (id: string) => {
        return await prisma.assessmentCertificates.findFirst({
            where: {
                certificate_code: id,
            }, include: {
                user_assessment: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                                username: true,
                            }
                        },
                    }
                },
            }
        });
    }
}

export default AssessmentCertificateRepository;