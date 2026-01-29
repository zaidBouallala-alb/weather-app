export default async function handler(req, res) {
    const { text } = req.query;
    const API_KEY = process.env.REACT_APP_GEO_API_KEY;

    if (!text) {
        return res.status(400).json({ error: 'Missing search text' });
    }

    try {
        const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&type=city&format=json&apiKey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Geo API failed');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
}
