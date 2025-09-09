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
}
export default CompanyRepository;
