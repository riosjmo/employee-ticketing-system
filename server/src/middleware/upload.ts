import fs from "fs";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../config/s3.js";
import { v4 as uuidv4 } from "uuid";

import dotenv from "dotenv";
dotenv.config();

const useS3 = !!(
  process.env.AWS_S3_BUCKET &&
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY
);

let storage: multer.StorageEngine;

if (useS3) {
  storage = multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET as string,
    acl: "public-read",
    key: function (req, file, cb) {
      const ext = file.originalname.split(".").pop();
      const filename = `${uuidv4()}.${ext}`;
      cb(null, filename);
    },
  });
} else {
  const uploadDir = path.resolve(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, uploadDir);
    },
    filename: function (_req, file, cb) {
      const ext = file.originalname.split(".").pop();
      cb(null, `${uuidv4()}.${ext}`);
    },
  });
}

export const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Unsupported file type"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});