import { Queue } from "bullmq";
import { QueueEvents } from "bullmq";
import { redis } from "../config/redis.js";

export const emailQueue = new Queue("emailQueue", {
  connection: redis,
});

const emailQueueEvents = new QueueEvents("emailQueue", {
  connection: redis,
});

// Completed event
emailQueueEvents.on("completed", async ({ jobId }) => {
  console.log(`🎉 Job ${jobId} completed`);
});

// Failed event
emailQueueEvents.on("failed", async ({ jobId, failedReason }) => {
  console.error(`❌ Job ${jobId} failed: ${failedReason}`);
});

// Progress event
emailQueueEvents.on("progress", async ({ jobId, data }) => {
  console.log(`📊 Job ${jobId} progress:`, data);
});
