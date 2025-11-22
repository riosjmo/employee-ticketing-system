import { Router } from "express"
import { ticketsController } from "../controllers/tickets.controller.js"

const router = Router()

router.get("/", ticketsController.getAll)
router.get("/:id", ticketsController.getOne)
router.post("/", ticketsController.create)

export default router