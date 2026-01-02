import { emailQueue } from "../queues/email.queue.js";

export const QueueService = {
  sendWelcomeEmail(email: string) {
    return emailQueue.add("welcome_email", { email }, {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
    });
  },
};