import type { Ticket } from "../types/Ticket.js"
import prisma from "../config/prisma.js"

export const ticketsRepo = {
  create(data: { title: string; description?: string; ownerId?: string }) {
    return prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        owner: data.ownerId ? { connect: { id: data.ownerId } } : undefined,
      },
    });
  },

  findAllWithOwnerAndFiles() {
    return prisma.ticket.findMany({
      include: { owner: { select: { id: true, email: true } }, files: true },
      orderBy: { createdAt: "desc" },
    });
  },

  findByIdWithOwnerAndFiles(id: string) {
    return prisma.ticket.findUnique({
      where: { id },
      include: { owner: { select: { id: true, email: true } }, files: true },
    });
  },

  update(id: string, data: any) {
    return prisma.ticket.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.ticket.delete({ where: { id } });
  }
};