import { z } from "zod";

// Enum untuk jawaban benar
export const CorrectOptionEnum = z.enum(["A", "B", "C", "D"]);

// Schema untuk satu pertanyaan
const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  option_A: z.string().min(1, "Option A is required"),
  option_B: z.string().min(1, "Option B is required"),
  option_C: z.string().min(1, "Option C is required"),
  option_D: z.string().min(1, "Option D is required"),
  correct_option: CorrectOptionEnum,
});

// Schema untuk create preselection test
export const schemaPreselectionInput = z.object({
  passingScore: z.number().min(0).max(100),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

// TypeScript type (opsional)
export type PreselectionInput = z.infer<typeof schemaPreselectionInput>;
