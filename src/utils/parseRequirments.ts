import { parse } from "node-html-parser";

/**
 * Ambil first N requirements dari job description HTML
 */
export const parseRequirements = (
  description?: string,
  limit = 3
): string[] => {
  if (!description) return [];

  const root = parse(description);
  const ol = root.querySelector("ol");
  if (!ol) return [];

  const requirements: string[] = [];
  ol.querySelectorAll("li").forEach((li, idx) => {
    if (idx >= limit) return;
    const text = li.text.trim();
    if (text) requirements.push(text);
  });

  return requirements;
};
