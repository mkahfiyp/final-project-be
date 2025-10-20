import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { Express } from "express";

// bikin supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ROLE_KEY as string
);

// fungsi upload pdf
export const supabaseUploadPdf = async (
  file: Express.Multer.File
): Promise<string> => {
  if (!file) throw new Error("No file provided");

  // generate nama unik
  const fileName = `cv/${uuidv4()}-${file.originalname}`;

  // upload ke bucket
  const { error } = await supabase.storage
    .from("cv") // ini nama bucket yang kamu buat di supabase
    .upload(fileName, file.buffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // generate public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("cv").getPublicUrl(fileName);

  return publicUrl; // ini bisa dipakai untuk iframe/object pdf
};
