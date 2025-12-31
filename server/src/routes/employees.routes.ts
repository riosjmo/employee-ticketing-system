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

// Return a single employee by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, role: true, name: true } });
    if (!user) return res.status(404).json({ message: "Employee not found" });
    const mapped = { id: user.id, name: user.name ?? user.email.split("@")[0], email: user.email, role: user.role };
    res.json(mapped);
  } catch (err) {
    console.error("Failed to fetch employee", err);
    res.status(500).json({ message: "Failed to fetch employee" });
  }
});

export default router;
