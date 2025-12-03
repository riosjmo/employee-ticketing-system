import { Router } from "express"
import prisma from "../config/prisma.js"
import { QueueService } from "../services/queue.service.js";

const router = Router()

// List all tickets
router.get("/", async (req, res) => {
	const tickets = await prisma.ticket.findMany()
	res.json(tickets)
})

// Get ticket by id
router.get("/:id", async (req, res) => {
	const { id } = req.params
	const ticket = await prisma.ticket.findUnique({ where: { id } })
	if (!ticket) return res.status(404).json({ message: "Ticket not found" })
	res.json(ticket)
})

// Create ticket
router.post("/", async (req, res) => {
	const { title, description, status } = req.body
	const ticket = await prisma.ticket.create({
		data: {
			title,
			description: description ?? "",
			status: status ?? "open",
		},
	})
	res.status(201).json(ticket)
})

// Test email queue
router.post("/test-email", async (req, res) => {
  const { email } = req.body;

  const job = await QueueService.sendWelcomeEmail(email);

  res.json({
    message: "Email job queued!",
    jobId: job.id,
  });
});

// Update ticket
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
		// Prisma throws when record not found
		res.status(404).json({ message: "Ticket not found" })
	}
})

// Delete ticket
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