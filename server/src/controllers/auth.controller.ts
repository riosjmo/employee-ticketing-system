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


export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });

    // Create tokens
    const accessToken = createAccessToken(newUser.id);
    const refreshToken = createRefreshToken(newUser.id);

    await storeRefreshToken(newUser.id, refreshToken);

    // Return user info + tokens
    res.status(201).json({
      user: { id: newUser.id, email: newUser.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

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
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body; // send raw JWT now
    if (!refreshToken) return res.status(400).json({ message: "No token provided" });

    await revokeRefreshTokenByToken(refreshToken);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    // Here i verify the refresh token and issue a new access token
    // I'll integrate JWT verify and token lookup next
    res.status(200).json({ message: "Refresh token endpoint (to be completed)" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}