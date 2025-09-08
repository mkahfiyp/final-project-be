import multer from "multer";

export const uploadMemory = () => {
  return multer({
    storage: multer.memoryStorage(),

    limits: { fileSize: 5 * 1024 * 1024 },
  });
};
