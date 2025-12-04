import { Request, Response } from "express";
import { ticketsService } from "../services/tickets.service.js";
import { z } from "zod";

const createTicketSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const ticketsController = {
  // GET /tickets
  async listAll(req: Request, res: Response) {
    try {
      const data = await ticketsService.listAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch tickets" });
    }
  },

  // GET /tickets/:id
  async getOne(req: Request, res: Response) {
    try {
      const ticket = await ticketsService.getOne(req.params.id);
      if (!ticket) return res.status(404).json({ message: "Ticket not found" });
      res.json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch ticket" });
    }
  },

  // POST /tickets
  async create(req: Request, res: Response) {
    const parsed = createTicketSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const userId = (req as any).user?.userId; // from auth middleware
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
      const ticket = await ticketsService.create(userId, parsed.data);
      res.status(201).json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create ticket" });
    }
  },
};