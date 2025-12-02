import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.js";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export function validateAccessToken(
  req: Request & { user?: DecodedToken },
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      authConfig.accessTokenSecret as string
    ) as DecodedToken;

    req.user = decoded; // attach user info to request object
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}