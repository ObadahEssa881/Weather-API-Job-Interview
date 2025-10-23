// src/routes/weatherRoutes.ts
import { Router } from "express";
import { getCurrentWeather } from "../controllers/weatherController";
import { validateCityQuery } from "../middlewares/validateQuery";

const router = Router();
router.get("/current", validateCityQuery, getCurrentWeather);

export default router;
