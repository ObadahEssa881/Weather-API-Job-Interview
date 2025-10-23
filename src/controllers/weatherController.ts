import type { Request, Response, NextFunction } from "express";
import { getFilteredWeather } from "../services/weatherService";

export async function getCurrentWeather(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const city = (req.query.city as string)?.trim();
    if (!city) {
      return res.status(400).json({ error: "Missing city parameter" });
    }
    const data = await getFilteredWeather(city);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
