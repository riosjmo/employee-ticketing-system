import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import prisma from "../config/prisma.js";  

interface VideoJobData {
  userId: number;
  prompt: string;
}

const worker = new Worker(
  "emailQueue",
  async job => {
    console.log("📨 Processing email job:", job.name, job.data);

    // Simulate an email send
    if (!job.data.email) {
      throw new Error("Email is missing!");
    }

    await new Promise(res => setTimeout(res, 1500));

    console.log("✅ Email sent successfully");
  },
  {
    connection: redis,
    concurrency: 5, // process 5 jobs in parallel
  }
);