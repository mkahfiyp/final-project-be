import { prisma } from "../config/prisma";
import AppError from "../errors/appError";

interface EducationData {
  university: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

class EducationRepository {
  /**
   * Get all educations for a user
   */
  async getEducationsByUserId(userId: number) {
    return await prisma.education.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  /**
   * Create new education
   */
  async createEducation(data: EducationData, userId: number) {
    return await prisma.education.create({
      data: {
        university: data.university,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description,
        user_id: userId,
      },
    });
  }

  /**
   * Get education by ID and user ID
   */
  async getEducationById(educationId: number, userId: number) {
    return await prisma.education.findFirst({
      where: {
        education_id: educationId,
        user_id: userId,
      },
    });
  }

  /**
   * Update education
   */
  async updateEducation(educationId: number, data: Partial<EducationData>, userId: number) {
    // Check if education exists and belongs to user
    const existingEducation = await this.getEducationById(educationId, userId);
    if (!existingEducation) {
      throw new AppError("Education not found", 404);
    }

    return await prisma.education.update({
      where: {
        education_id: educationId,
      },
      data: {
        ...(data.university && { university: data.university }),
        ...(data.degree && { degree: data.degree }),
        ...(data.fieldOfStudy && { fieldOfStudy: data.fieldOfStudy }),
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate && { endDate: new Date(data.endDate) }),
        ...(data.description !== undefined && { description: data.description }),
      },
    });
  }

  /**
   * Delete education
   */
  async deleteEducation(educationId: number, userId: number) {
    // Check if education exists and belongs to user
    const existingEducation = await this.getEducationById(educationId, userId);
    if (!existingEducation) {
      throw new AppError("Education not found", 404);
    }

    return await prisma.education.delete({
      where: {
        education_id: educationId,
      },
    });
  }
}

export default EducationRepository;
