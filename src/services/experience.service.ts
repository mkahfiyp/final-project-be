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

  /**
   * Get all experiences for a user
   */
  async getExperiences(userId: number) {
    try {
      return await this.experienceRepository.getExperiencesByUserId(userId);
    } catch (error) {
      throw new AppError("Failed to fetch experiences", 500);
    }
  }

  /**
   * Create new experience
   */
  async createExperience(data: ExperienceData, userId: number) {
    // Validate required fields
    if (!data.name || !data.position || !data.startDate) {
      throw new AppError("Missing required fields: name, position, startDate", 400);
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
      return await this.experienceRepository.createExperience(data, userId);
    } catch (error) {
      throw new AppError("Failed to create experience", 500);
    }
  }

  /**
   * Update experience
   */
  async updateExperience(experienceId: number, data: Partial<ExperienceData>, userId: number) {
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
      return await this.experienceRepository.updateExperience(experienceId, data, userId);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to update experience", 500);
    }
  }

  /**
   * Delete experience
   */
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
