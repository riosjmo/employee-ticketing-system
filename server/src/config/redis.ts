import { Redis } from "ioredis";

// Create an ioredis instance with options compatible with BullMQ.
// BullMQ requires `maxRetriesPerRequest` to be `null` (not a number),
// otherwise it will throw at runtime when creating blocking connections.
export const redis = new Redis({
  host: "localhost",
  port: 6379,
  // ensure compatibility with BullMQ blocking commands
  maxRetriesPerRequest: null,
});