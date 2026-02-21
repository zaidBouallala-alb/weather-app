/**
 * Geocoding API Service
 * Handles all Geoapify geocoding interactions.
 */

const API_KEY = process.env.REACT_APP_GEO_API_KEY?.trim();
const BASE_URL = 'https://api.geoapify.com/v1/geocode';

/**
 * Searches for cities matching the given text.
 * @param {string} text - Search query (min 2 chars recommended)
 * @returns {Promise<Array<{lat: number, lon: number, city: string, country: string, formatted: string}>>}
 */
export async function searchCities(text) {
    if (!API_KEY) {
        throw new Error('Missing Geoapify API Key. Please add REACT_APP_GEO_API_KEY to your .env file.');
    }

    const response = await fetch(
        `${BASE_URL}/autocomplete?text=${encodeURIComponent(text)}&type=city&format=json&apiKey=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error('Geocoding API request failed.');
    }

    const json = await response.json();

    return (json.results || []).map(({ lat, lon, city, country, formatted }) => ({
        lat,
        lon,
        city,
        country,
        formatted,
    }));
}
