import { Router } from "express";
import prisma from "../config/prisma.js";

const router = Router();

// Return a list of employees (users). If a user has no name field,
// derive a display name from their email local-part so the frontend
// can uniformly render `name`.
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, role: true, name: true } });
    const mapped = users.map((u: { id: string; email: string; role: string; name?: string | null }) => ({ id: u.id, name: u.name ?? u.email.split("@")[0], email: u.email, role: u.role }));
    res.json(mapped);
  } catch (err) {
    console.error("Failed to fetch employees", err);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

export default router;
