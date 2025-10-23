# 🌦️ Weather API – Junior Backend Developer Task

A small backend service built with **Node.js + TypeScript + Express** for fetching and caching live weather data from the **OpenWeatherMap API**.

---

## 🚀 Overview

The service exposes a single REST endpoint:

GET /api/weather/current?city={cityName}


It retrieves current weather data for a given city using the **OpenWeatherMap API**, applies validation and caching, and returns a cleaned response in a consistent JSON format.

---

## ✨ Features

- ✅ **TypeScript** — full type safety using interfaces & DTOs  
- ✅ **Express.js** — robust and fast web server  
- ✅ **Zod validation** — query validation for cleaner error handling  
- ✅ **Axios** — HTTP client for calling the external API  
- ✅ **Custom error handler** — unified error responses (400, 404, 502, 500)  
- ✅ **Simple in-memory caching** — prevents redundant API calls  
- ✅ **Morgan** — development-friendly request logging  
- ✅ **Environment variable management** using `.env`  
- ✅ **Clean, modular architecture** — separation of client / service / controller / middleware



## 🧩 API Response Example

**Request:**
GET /api/weather/current?city=Berlin


**Response:**
```json
{
  "cityName": "Berlin",
  "temperatureCelsius": 14.7,
  "weatherDescription": "scattered clouds",
  "humidityPercentage": 87
}
```
## ⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/<your-username>/weather-api.git
cd weather-api

3. Install Dependencies
npm install

5. Create .env File
PORT=4000
WEATHER_API_BASE=https://api.openweathermap.org/data/2.5
WEATHER_API_KEY=your_real_openweather_api_key_here

⚠️ You can get a free API key by signing up at https://openweathermap.org/api.

7. Run in Development

npm run dev

5. Build for Production

npm run build
npm start

🧠 How It Works
The client sends a GET request with a city query.

Input is validated by Zod (validateCityQuery middleware).

Controller (getCurrentWeather) calls the service layer.

Service calls the external API client (fetchWeatherByCity).

Results are cached for 30 seconds using a simple in-memory cache.

Any errors are passed to the global error handler:

400 → missing or invalid city

404 → city not found or API unreachable

502 → incomplete data from API

500 → internal server errors

## 🧱 Technologies Used
Tool	Purpose
Node.js	Runtime environment
TypeScript	Static typing and compile-time safety
Express.js	Web framework
Axios	HTTP client for API requests
Zod	Schema-based validation
Morgan	Request logger
Dotenv	Environment variable management

## 💡 Example Error Responses
Scenario	Response Code	Example
Missing city parameter	400	{ "error": "Missing city parameter" }
Invalid city (not found)	404	{ "error": "city not found" }
API unreachable	404	{ "error": "Resource not found (upstream unreachable)" }
Unexpected error	500	{ "error": "Internal Server Error" }

## 🧠 Key Concepts Demonstrated
Async/Await & Promises for clean asynchronous flow

Layered architecture (Controller → Service → Client → Utility)

Type safety with TypeScript interfaces

Caching strategy using TTL

Centralized error management for cleaner code

Validation for reliable API inputs

🧪 Testing (Optional Manual Tests)
Try the following URLs:

✅ Working city:
http://localhost:4000/api/weather/current?city=Berlin

❌ Missing query:
http://localhost:4000/api/weather/current

❌ Unknown city:
http://localhost:4000/api/weather/current?city=NoSuchCityXXX

🗂️ Project Status
✅ Completed and working version — ready for deployment or extension.

Next possible improvements:

Add Redis caching for scalability

Implement unit tests with Jest

Add rate limiting and API key authentication

Dockerize the app for deployment
