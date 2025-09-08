import { z } from "zod";

// Schema validasi update profile
export const schemaUpdateProfileRoleUser = z.object({
  name: z.string().min(1, "Nama harus diisi"), // wajib diisi
  phone: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string(), // kirim format "YYYY-MM-DD"
  address: z.string(),
});
