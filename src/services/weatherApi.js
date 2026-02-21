/**
 * Weather API Service
 * Handles all OpenWeatherMap API interactions.
 */

const API_KEY = process.env.REACT_APP_WEATHER_API?.trim();
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather and 5-day forecast for a given location.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} unit - 'metric' or 'imperial'
 * @returns {Promise<{weather: Object, forecast: Array}>}
 */
export async function fetchWeather(lat, lon, unit = 'metric') {
    if (!API_KEY) {
        throw new Error('Missing OpenWeatherMap API Key. Please add REACT_APP_WEATHER_API to your .env file.');
    }

    const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
        fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
    ]);

    if (weatherRes.status === 401 || forecastRes.status === 401) {
        throw new Error('Invalid OpenWeatherMap API Key. Please check your .env file.');
    }
    if (!weatherRes.ok) throw new Error('Weather API request failed.');
    if (!forecastRes.ok) throw new Error('Forecast API request failed.');

    const weatherJson = await weatherRes.json();
    const forecastJson = await forecastRes.json();

    return {
        weather: weatherJson,
        forecast: forecastJson.list,
    };
}
