import slug from "slug";
import { prisma } from "../config/prisma";

export const createSlug = async (title: string) => {
  let slugBase = slug(title, { lower: true });
  let uniqueSlug = slugBase;
  let counter = 1;

  while (await prisma.jobs.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slugBase}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};
