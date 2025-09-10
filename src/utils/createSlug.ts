import slug from "slug";
import { prisma } from "../config/prisma";

export const createSlug = async (
  title: string,
  category: string,
  jobType: string
) => {
  // gabungkan title + category + jobType
  let slugBase = slug(`${title} ${category} ${jobType}`, { lower: true });
  let uniqueSlug = slugBase;
  let counter = 1;

  // cek uniqueness di database
  while (await prisma.jobs.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slugBase}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};
