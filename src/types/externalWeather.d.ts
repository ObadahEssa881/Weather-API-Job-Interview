export interface ExternalWeatherMain {
  temp: number;
  humidity: number;
}

export interface ExternalWeatherWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ExternalWeatherResponse {
  name: string;
  main: ExternalWeatherMain;
  weather: ExternalWeatherWeather[];
  cod: number;
  message?: string;
}
