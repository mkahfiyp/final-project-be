import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

import * as streamifier from "streamifier";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

//req.file di tangani multer
export const cloudinaryUpload = (
  file: Express.Multer.File
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      (err, result: UploadApiResponse) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

// req.file di-handle multer unutk pdf
export const cloudinaryUploadPdf = (
  file: Express.Multer.File
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file provided"));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "pdfs",
        resource_type: "auto", // penting supaya bisa preview
        format: "pdf",
      },
      (err, result) => {
        if (err) return reject(err);
        if (!result) return reject(new Error("Upload result undefined"));
        resolve(result);
      }
    );

    // pastikan stream beneran nulis semua
    const stream = streamifier.createReadStream(file.buffer);
    stream.on("error", (err) => reject(err));
    stream.pipe(uploadStream);
  });
};
