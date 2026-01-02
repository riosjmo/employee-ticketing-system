import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import {
  hashPassword,
  verifyPassword,
  createAccessToken,
  createRefreshToken,
  storeRefreshToken,
  revokeRefreshTokenByToken,
} from "../services/auth.service.js";


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    const passwordHash = await hashPassword(password);

    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          passwordHash: passwordHash,
        }
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: { id: newUser.id, email: newUser.email }
      });
    } catch (createErr: any) {
      if (createErr?.code === 'P2002') {
        return res.status(409).json({ message: 'Email already in use' });
      }
      throw createErr;
    }

  } catch (error: any) {
    console.error("REGISTER ERROR:", error?.stack || error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const validPassword = await verifyPassword(password, user.passwordHash);

    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    await storeRefreshToken(user.id, refreshToken);

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "No token provided" });

    await revokeRefreshTokenByToken(refreshToken);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}