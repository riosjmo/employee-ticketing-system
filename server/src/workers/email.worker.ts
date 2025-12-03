import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import prisma from "../config/prisma.js";  

interface VideoJobData {
  userId: number;
  prompt: string;
}

const worker = new Worker(
  "videoQueue",
  async job => {
    try {
      const { userId, prompt } = job.data as VideoJobData;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User not found");

      // YOUR heavy logic here
      const result = await generateVideoFromPrompt(prompt);

      // save video
      const video = await prisma.video.create({
        data: {
          url: result.url,
          duration: result.duration,
          job: { connect: { id: job.id } },
          user: { connect: { id: userId } },
        },
      });

      // update job status
      await prisma.videoJob.update({
        where: { id: job.id },
        data: { status: "completed" },
      });

      console.log(`✅ Job ${job.id} completed — video id ${video.id}`);
    } catch (err) {
      console.error(`❌ Job ${job.id} failed:`, err);
      await prisma.videoJob.update({
        where: { id: job.id },
        data: { status: "failed" },
      });
      throw err;
    }
  },
  { connection: redis, concurrency: 2 }
);

worker.on("completed", job => console.log(`Job ${job.id} done.`));
worker.on("failed", (job, err) => console.error(`Job ${job?.id} failed:`, err));