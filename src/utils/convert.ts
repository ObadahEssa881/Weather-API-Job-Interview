export const kelvinToCelsius = (k: number): number => {
  return Math.round((k - 273.15) * 10) / 10; // one decimal
};
