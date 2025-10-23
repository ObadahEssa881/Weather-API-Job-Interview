// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: any, res: any, _next: any) {
  console.error("🔥 ERROR STACK:", err);
  const status = err.status || err.response?.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
}
