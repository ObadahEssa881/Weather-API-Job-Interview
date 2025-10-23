// src/services/weatherService.ts
import { fetchWeatherByCity } from "../clients/externalWeatherClient";
import { WeatherResponseDTO } from "../types/weather";
import { kelvinToCelsius } from "../utils/convert";
import { ExternalWeatherResponse } from "../types/externalWeather";

export async function getFilteredWeather(
  city: string
): Promise<WeatherResponseDTO> {
  const raw: ExternalWeatherResponse = await fetchWeatherByCity(city);

  if (!raw || !raw.name || !raw.main || !raw.weather || !raw.weather[0]) {
    const e: any = new Error("Incomplete data from external weather API");
    e.status = 502; // Bad Gateway
    throw e;
  }

  const dto: WeatherResponseDTO = {
    cityName: raw.name,
    temperatureCelsius: kelvinToCelsius(raw.main.temp),
    weatherDescription: raw.weather[0].description,
    humidityPercentage: Math.round(raw.main.humidity),
  };

  return dto;
}
