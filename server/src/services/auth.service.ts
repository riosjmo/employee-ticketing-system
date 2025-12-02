import bcrypt from "bcrypt";
import jwt, { type SignOptions, type Secret } from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { authConfig } from "../config/auth.js";

interface JWTPayload {
  userId: string;
}
// ---------------------------
// PASSWORD HASHING
// ---------------------------
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

// ---------------------------
// TOKEN HELPERS
// ---------------------------
export function createAccessToken(userId: string) {
  const payload: JWTPayload = { userId };

  return jwt.sign(
    payload,
    authConfig.accessTokenSecret as Secret,
    { expiresIn: authConfig.accessTokenExpiry as any } as SignOptions
  );
}

export function createRefreshToken(userId: string) {
  const payload: JWTPayload = { userId };

  return jwt.sign(
    payload,
    authConfig.refreshTokenSecret as Secret,
    { expiresIn: authConfig.refreshTokenExpiry as any } as SignOptions
  );
}

// Save hashed refresh token in DB
export async function storeRefreshToken(userId: string, token: string) {
  const tokenHash = await bcrypt.hash(token, 10);

  return prisma.refreshToken.create({
    data: {
      tokenHash,
      userId,
    },
  });
}

export async function revokeRefreshTokenByToken(token: string) {
  // hash the token exactly the same way it was stored
  const tokenHash = await bcrypt.hash(token, 10);

  // update matching refresh tokens (if any)
  return prisma.refreshToken.updateMany({
    where: { tokenHash, revoked: false },
    data: { revoked: true },
  });
}