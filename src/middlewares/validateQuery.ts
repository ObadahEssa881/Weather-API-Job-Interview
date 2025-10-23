import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const schema = z.object({
  city: z
    .string()
    .min(1, "City name is required")
    .max(100, "City name too long"),
});

export function validateCityQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    return res.status(400).json({ error: message });
  }
  next();
}
