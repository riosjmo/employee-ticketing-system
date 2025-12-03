import { Request, Response } from "express";
import prisma from "../config/prisma.js";

// GET /jobs
export async function getJobs(req: Request, res: Response) {
  const userId = prisma.user.id;

  const jobs = await prisma.videoJob.findMany({
    where: { userId },
    include: {
      user: true,
      video: true,
    },
  });

  res.json(jobs);
}

// GET /jobs/:id
export async function getJobById(req: Request, res: Response) {
  const jobId = Number(req.params.id);

  const job = await prisma.videoJob.findUnique({
    where: { id: jobId },
    include: {
      user: true,
      video: true,
    },
  });

  res.json(job);
}

export async function createJob(req: Request, res: Response) {
  const userId = prisma.user.id;
  const { prompt } = req.body;

  const job = await prisma.videoJob.create({
    data: {
      prompt,
      user: { connect: { id: userId } },
    },
  });

  res.json(job);
}