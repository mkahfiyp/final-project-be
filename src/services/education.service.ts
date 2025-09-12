import EducationRepository from "../repositories/education.repository";
import AppError from "../errors/appError";
import { DegreeLevel } from "../../prisma/generated/client";

interface EducationData {
  university: string;
  degree: DegreeLevel;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

class EducationService {
  private educationRepository = new EducationRepository();

  /**
   * Get all educations for a user
   */
  async getEducations(userId: number) {
    try {
      return await this.educationRepository.getEducationsByUserId(userId);
    } catch (error) {
      throw new AppError("Failed to fetch educations", 500);
    }
  }

  /**
   * Create new education
   */
  async createEducation(data: EducationData, userId: number) {
    // Validate required fields
    if (
      !data.university ||
      !data.degree ||
      !data.fieldOfStudy ||
      !data.startDate
    ) {
      throw new AppError(
        "Missing required fields: university, degree, fieldOfStudy, startDate",
        400
      );
    }

    // Validate dates
    const startDate = new Date(data.startDate);
    if (isNaN(startDate.getTime())) {
      throw new AppError("Invalid start date format", 400);
    }

    if (data.endDate) {
      const endDate = new Date(data.endDate);
      if (isNaN(endDate.getTime())) {
        throw new AppError("Invalid end date format", 400);
      }
      if (endDate < startDate) {
        throw new AppError("End date cannot be before start date", 400);
      }
    }

    try {
      return await this.educationRepository.createEducation(data, userId);
    } catch (error) {
      throw new AppError("Failed to create education", 500);
    }
  }

  /**
   * Update education
   */
  async updateEducation(
    educationId: number,
    data: Partial<EducationData>,
    userId: number
  ) {
    // Validate dates if provided
    if (data.startDate) {
      const startDate = new Date(data.startDate);
      if (isNaN(startDate.getTime())) {
        throw new AppError("Invalid start date format", 400);
      }
    }

    if (data.endDate) {
      const endDate = new Date(data.endDate);
      if (isNaN(endDate.getTime())) {
        throw new AppError("Invalid end date format", 400);
      }
    }

    if (data.startDate && data.endDate) {
      if (new Date(data.endDate) < new Date(data.startDate)) {
        throw new AppError("End date cannot be before start date", 400);
      }
    }

    try {
      return await this.educationRepository.updateEducation(
        educationId,
        data,
        userId
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to update education", 500);
    }
  }

  /**
   * Delete education
   */
  async deleteEducation(educationId: number, userId: number) {
    try {
      return await this.educationRepository.deleteEducation(
        educationId,
        userId
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to delete education", 500);
    }
  }
}

export default EducationService;
