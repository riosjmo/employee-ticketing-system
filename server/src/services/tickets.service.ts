import { ticketsRepo } from "../repositories/tickets.repo.js"

export const ticketsService = {
  listAll() {
    return ticketsRepo.findAllWithOwnerAndFiles();
  },

  getOne(id: string) {
    return ticketsRepo.findByIdWithOwnerAndFiles(id);
  },

  create(userId: string, payload: { title: string; description?: string }) {
    return ticketsRepo.create({
      title: payload.title,
      description: payload.description,
      ownerId: userId,
    });
  },

  update(id: string, data: any) {
    return ticketsRepo.update(id, data);
  },

  delete(id: string) {
    return ticketsRepo.delete(id);
  }
};