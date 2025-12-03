import { Worker } from "bullmq";
import { redis } from "../config/redis.js";

const worker = new Worker(
  "emailQueue",
  async job => {
    console.log("Processing email job:", job.name);
    console.log("Payload:", job.data);

    // Simulate sending email (replace later with actual email service)
    await new Promise(res => setTimeout(res, 2000));

    console.log("Email sent!");
  },
  { connection: redis }
);

worker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});