import { Router } from "express"
import prisma from "../config/prisma.js"
import { ticketsRepo } from "../repositories/tickets.repo.js";

const router = Router()

router.get("/", async (req, res) => {
	const tickets = await ticketsRepo.findAllWithOwnerAndFiles();
	res.json(tickets);
})

router.get("/:id", async (req, res) => {
	const { id } = req.params
	const ticket = await ticketsRepo.findByIdWithOwnerAndFiles(id);
	if (!ticket) return res.status(404).json({ message: "Ticket not found" })
	res.json(ticket)
})

router.post("/", async (req, res) => {
  const { title, description } = req.body;

  const ticket = await ticketsRepo.create({
    title,
    description: description ?? "",
  });

  res.status(201).json(ticket);
});

router.put("/:id", async (req, res) => {
	const { id } = req.params
	const { title, description, status } = req.body
	try {
		const ticket = await prisma.ticket.update({
			where: { id },
			data: { title, description, status },
		})
		res.json(ticket)
	} catch (err: any) {
		res.status(404).json({ message: "Ticket not found" })
	}
})

router.delete("/:id", async (req, res) => {
	const { id } = req.params
	try {
		await prisma.ticket.delete({ where: { id } })
		res.status(204).send()
	} catch (err: any) {
		res.status(404).json({ message: "Ticket not found" })
	}
})

export default router