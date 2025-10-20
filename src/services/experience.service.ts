import ExperienceRepository from "../repositories/experience.repository";
import AppError from "../errors/appError";

interface ExperienceData {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

class ExperienceService {
  private experienceRepository = new ExperienceRepository();

  async getExperiences(userId: number) {
    try {
      return await this.experienceRepository.getExperiencesByUserId(userId);
    } catch (error) {
      throw new AppError("Failed to fetch experiences", 500);
    }
  }

  async createExperience(data: ExperienceData, userId: number) {
    if (!data.name || !data.position || !data.startDate) {
      throw new AppError("Missing required fields: name, position, startDate", 400);
    }

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
      return await this.experienceRepository.createExperience(data, userId);
    } catch (error) {
      throw new AppError("Failed to create experience", 500);
    }
  }

  async updateExperience(experienceId: number, data: Partial<ExperienceData>, userId: number) {
    if (data.startDate && data.endDate) {
      if (new Date(data.endDate) < new Date(data.startDate)) {
        throw new AppError("End date cannot be before start date", 400);
      }
    }

    try {
      return await this.experienceRepository.updateExperience(experienceId, data, userId);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to update experience", 500);
    }
  }

  async deleteExperience(experienceId: number, userId: number) {
    try {
      return await this.experienceRepository.deleteExperience(experienceId, userId);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to delete experience", 500);
    }
  }
}

export default ExperienceService;
