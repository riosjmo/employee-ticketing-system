import { ticketsRepo } from "../repositories/tickets.repo.js"

export const ticketsService = {
  getAll() {
    return ticketsRepo.findAll()
  },

  getOne(id: string) {
    const ticket = ticketsRepo.findById(id)
    if (!ticket) throw new Error("Ticket not found")
    return ticket
  },

  create(data: { title: string; description?: string }) {
    return ticketsRepo.create(data)
  },
}