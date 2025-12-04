import type { Ticket } from "../types/Ticket.js"
import { randomUUID } from "crypto"
import prisma from "../config/prisma.js"

let tickets: Ticket[] = []

export const ticketsRepo = {
  findAll(): Ticket[] {
    return tickets
  },

  findById(id: string): Ticket | undefined {
    return tickets.find(t => t.id === id)
  },

  create(data: Partial<Ticket>): Ticket {
    const newTicket: Ticket = {
      id: randomUUID(),
      title: data.title!,
      description: data.description || "",
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    tickets.push(newTicket)
    return newTicket
  },
}