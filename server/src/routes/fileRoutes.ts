import { Router, Response } from "express";
import { upload } from "../middleware/upload.js";
import { validateAccessToken } from "../middleware/auth.js";
import prisma from "../config/prisma.js";

interface AuthRequest extends Express.Request {
  user?: {
    userId: string;
    iat: number;
    exp: number;
  };
}

const router = Router();

router.post(
  "/upload",
  validateAccessToken,
  upload.single("file"),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file || !req.user) {
        return res.status(400).json({ error: "File or user info missing" });
      }

      const fileUrl: string =
        // @ts-ignore
        req.file.location || req.file.path;

      const file = await prisma.file.create({
        data: {
          url: fileUrl,
          // @ts-ignore
          key: req.file.key || req.file.filename,
          // @ts-ignore
          mimetype: req.file.mimetype,
          // @ts-ignore
          size: req.file.size,
          userId: req.user.userId,
        },
      });

      res.json({
        message: "File uploaded successfully",
        file,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Error uploading file" });
    }
  }
);

export default router;