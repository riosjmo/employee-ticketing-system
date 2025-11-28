import { Router, Request, Response } from "express"
import prisma from "../config/prisma.js"

const router = Router()

// GET /auth - list tickets (placeholder behavior)
router.get("/", async (req: Request, res: Response) => {
  const tickets = await prisma.ticket.findMany()
  res.json(tickets)
})

// POST /auth - create a ticket (placeholder behavior)
router.post("/", async (req: Request, res: Response) => {
  const body = req.body
  const ticket = await prisma.ticket.create({
    data: {
      title: body.title,
      description: body.description || "",
    },
  })
  res.status(201).json(ticket)
})

export default router