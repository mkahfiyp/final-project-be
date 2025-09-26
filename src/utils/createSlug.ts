import { prisma } from "../config/prisma";

export const createSlug = async (
  title: string,
  category: string,
  jobType: string,
  username: string
) => {
  // gabungkan title + category + jobType
  const { default: slug } = await import("slug");
  let slugBase = slug(`${title} ${category} ${jobType} ${username}`, {
    lower: true,
  });
  let uniqueSlug = slugBase;
  let counter = 1;

  // cek uniqueness di database
  while (await prisma.jobs.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slugBase}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

export const formatEnumCategory = (str: string): string => {
  if (!str.includes("-")) {
    return str;
  }
  return str.replace(/-/g, "_").toUpperCase();
};
