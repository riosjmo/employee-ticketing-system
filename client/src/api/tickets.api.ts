import { http } from "./http";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function getTickets() {
  return http<Ticket[]>("/tickets");
}

export function getTicket(id: string) {
  return http<Ticket>(`/tickets/${id}`);
}

export function createTicket(data: {
  title: string;
  description: string;
}) {
  return http<Ticket>("/tickets", {
    method: "POST",
    body: JSON.stringify(data),
  });
}