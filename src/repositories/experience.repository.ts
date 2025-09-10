import { prisma } from "../config/prisma";
import AppError from "../errors/appError";

interface ExperienceData {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

class ExperienceRepository {
  /**
   * Get all experiences for a user
   */
  async getExperiencesByUserId(userId: number) {
    return await prisma.experience.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  /**
   * Create new experience
   */
  async createExperience(data: ExperienceData, userId: number) {
    return await prisma.experience.create({
      data: {
        name: data.name,
        position: data.position,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description,
        user_id: userId,
      },
    });
  }

  /**
   * Get experience by ID and user ID
   */
  async getExperienceById(experienceId: number, userId: number) {
    return await prisma.experience.findFirst({
      where: {
        experience_id: experienceId,
        user_id: userId,
      },
    });
  }

  /**
   * Update experience
   */
  async updateExperience(experienceId: number, data: Partial<ExperienceData>, userId: number) {
    // Check if experience exists and belongs to user
    const existingExperience = await this.getExperienceById(experienceId, userId);
    if (!existingExperience) {
      throw new AppError("Experience not found", 404);
    }

    return await prisma.experience.update({
      where: {
        experience_id: experienceId,
      },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.position && { position: data.position }),
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate && { endDate: new Date(data.endDate) }),
        ...(data.description !== undefined && { description: data.description }),
      },
    });
  }

  /**
   * Delete experience
   */
  async deleteExperience(experienceId: number, userId: number) {
    // Check if experience exists and belongs to user
    const existingExperience = await this.getExperienceById(experienceId, userId);
    if (!existingExperience) {
      throw new AppError("Experience not found", 404);
    }

    return await prisma.experience.delete({
      where: {
        experience_id: experienceId,
      },
    });
  }
}

export default ExperienceRepository;
