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
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "cv",
        type: "upload",
      },
      (err, result: UploadApiResponse | undefined) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
