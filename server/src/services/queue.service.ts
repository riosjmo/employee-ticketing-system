import { emailQueue } from "../queues/email.queue.js";

export const QueueService = {
  async sendWelcomeEmail(email: string) {
    return await emailQueue.add(
      "welcome_email",
      { email },
      {
        attempts: 3, // retry 3 times if failure
        backoff: {
          type: "exponential",
          delay: 2000 // 2s -> 4s -> 8s
        }
      }
    );
  },
};