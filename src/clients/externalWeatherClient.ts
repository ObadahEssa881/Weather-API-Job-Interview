import axios from "axios";
import type { ExternalWeatherResponse } from "../types/externalWeather";
import { SimpleCache } from "../utils/cache";

const BASE_URL =
  process.env.WEATHER_API_BASE || "https://api.openweathermap.org/data/2.5";
const cache = new SimpleCache<ExternalWeatherResponse>(30); // 30 seconds cache

export async function fetchWeatherByCity(
  city: string
): Promise<ExternalWeatherResponse> {
  const apiKey = process.env.WEATHER_API_KEY;
  console.log("Loaded API key prefix:", apiKey?.slice(0, 5)); 
  if (!apiKey) {
    const e: any = new Error("Missing WEATHER_API_KEY in environment");
    e.status = 500;
    throw e;
  }

  // Try cache first
  const cached = cache.get(city.toLowerCase());
  if (cached) {
    console.log(`Cache hit for ${city}`);
    return cached;
  }

  try {
    const { data } = await axios.get<ExternalWeatherResponse>(
      `${BASE_URL}/weather`,
      {
        params: { q: city, appid: apiKey },
      }
    );
    // Save to cache
    cache.set(city.toLowerCase(), data);
    return data;
  } catch (err: any) {
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message || err.message;
      const e: any = new Error(message);
      e.status = status;
      throw e;
    }
    throw err;
  }
}
