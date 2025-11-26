import { Router } from "express";
import ticketsRoutes from "./tickets.routes.js";

const router = Router();

router.use("/tickets", ticketsRoutes);

export default router;