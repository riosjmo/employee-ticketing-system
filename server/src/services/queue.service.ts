import { emailQueue } from "../queues/email.queue.js";

export const QueueService = {
  async sendWelcomeEmail(email: string) {
    return await emailQueue.add("welcome_email", { email });
  },
};