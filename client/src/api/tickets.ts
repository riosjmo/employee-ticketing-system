import { api } from "./client"
import type { Ticket } from "../types/Ticket"

export async function fetchTickets() {
  const res = await api.get<Ticket[]>("/tickets")
  return res.data
}

export async function fetchTicketById(id: string) {
  const res = await api.get<Ticket>(`/tickets/${id}`)
  return res.data
}

export async function createTicket(data: Partial<Ticket>) {
  const res = await api.post<Ticket>("/tickets", data)
  return res.data
}