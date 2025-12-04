import { Queue } from "bullmq";
import { redis } from "../config/redis.js";
import { emailQueue } from "../queues/email.queue.js";
import prisma from "../config/prisma.js";

export const videoQueue = new Queue("videoQueue", {
  connection: redis,
});

export const QueueService = {
  async enqueueVideoJob(userId: string, prompt: string) {
    // Create a VideoJob in DB first
    const dbJob = await prisma.videoJob.create({
      data: {
        userId,
        prompt,
        status: "queued",
      },
    });

    

    // Add the job to BullMQ
    await videoQueue.add(
      "generate_video",
      {
        dbJobId: dbJob.id,
        userId,
        prompt,
      },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
      }
    );

    return dbJob;
  },
  sendWelcomeEmail(email: string) {
    return emailQueue.add("welcome_email", { email }, {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
    });
  },
};