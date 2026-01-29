export default async function handler(req, res) {
    const { lat, lon, units } = req.query;
    const APC_KEY = process.env.REACT_APP_WEATHER_API;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Missing latitude or longitude' });
    }

    try {
        const weatherPromise = fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${units}&lon=${lon}&appid=${APC_KEY}`
        );
        const forecastPromise = fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&units=${units}&lon=${lon}&appid=${APC_KEY}`
        );

        const [weatherRes, forecastRes] = await Promise.all([
            weatherPromise,
            forecastPromise,
        ]);

        if (!weatherRes.ok) throw new Error('Weather API failed');
        if (!forecastRes.ok) throw new Error('Forecast API failed');

        const weatherJson = await weatherRes.json();
        const forecastJson = await forecastRes.json();

        res.status(200).json({ weather: weatherJson, forecast: forecastJson });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}
