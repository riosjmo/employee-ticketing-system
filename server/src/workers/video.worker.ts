import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import prisma from "../config/prisma.js";
import { generateVideoFromPrompt } from "../utils/generateVideoFromPrompt.js";

interface VideoJobData {
  dbJobId: string;
  userId: string;
  prompt: string;
}

const worker = new Worker(
  "videoQueue",
  async job => {
    const { dbJobId, userId, prompt } = job.data as VideoJobData;

    if (!userId) throw new Error("No userId provided in job data");

    // Fetch user from DB
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    try {
      // Generate video
      const result = await generateVideoFromPrompt(prompt);

      // Save video to DB
      const video = await prisma.video.create({
        data: {
          url: result.url,
          duration: result.duration,
          user: { connect: { id: userId } },
          job: { connect: { id: dbJobId } },
        },
      });

      // Update VideoJob status
      await prisma.videoJob.update({
        where: { id: dbJobId },
        data: { status: "completed" },
      });

      console.log(`✅ Job ${dbJobId} completed — video id ${video.id}`);
    } catch (err) {
      console.error(`❌ Job ${dbJobId} failed:`, err);
      await prisma.videoJob.update({
        where: { id: dbJobId },
        data: { status: "failed" },
      });
      throw err;
    }
  },
  { connection: redis, concurrency: 2 }
);

worker.on("completed", job => console.log(`🎉 Job ${job.id} finished.`));
worker.on("failed", (job, err) => console.error(`❌ Job ${job?.id} failed:`, err));