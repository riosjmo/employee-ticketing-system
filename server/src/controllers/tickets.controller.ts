import { Request, Response } from "express"
import { ticketsService } from "../services/tickets.service.js"
import { z } from "zod"

const createTicketSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
})

export const ticketsController = {
  getAll(req: Request, res: Response) {
    const data = ticketsService.getAll()
    res.json(data)
  },

  getOne(req: Request, res: Response) {
    try {
      const ticket = ticketsService.getOne(req.params.id)
      res.json(ticket)
    } catch {
      res.status(404).json({ message: "Ticket not found" })
    }
  },

  create(req: Request, res: Response) {
    const parsed = createTicketSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json(parsed.error)
    }

    const ticket = ticketsService.create(parsed.data)
    res.status(201).json(ticket)
  },
}