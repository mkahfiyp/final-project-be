import { AssessmentCertificateCreateDTO } from "../dto/AssessmentCertificate.dto";
import AssessmentCertificateRepository from "../repositories/AssessmentCertificate.repository";

class AssessmentCertificateService {
    private AssessmentCertificateRepo = new AssessmentCertificateRepository();

    createAssessmentCertificate = async (data: AssessmentCertificateCreateDTO) => {
        return await this.AssessmentCertificateRepo.createAssessmentCertificate(data);
    }
    
    getAssessmentCertificate = async (id: string) => {
        return await this.AssessmentCertificateRepo.getAssessmentCertificate(id);
    }
}

export default AssessmentCertificateService;