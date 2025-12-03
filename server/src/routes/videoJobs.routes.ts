import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
} from "../controllers/videoJobs.controller.js";
import { validateAccessToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", validateAccessToken, getJobs);
router.get("/:id", validateAccessToken, getJobById);
router.post("/", validateAccessToken, createJob);

export default router;