import axios from 'axios';

export default async function handler(req, res) {
    try {
        // Mengambil IP klien
        const clientIP = req.headers['cf-connecting-ip'] || (req.headers['x-forwarded-for'] || '').split(',').pop().trim()
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;

        const locationIPUrl = `https://vpnapi.io/api/${clientIP}?key=8d74e2c945cb479e8a59cfa6983dcbe0`;
        const locationIpResponse = await axios.get(locationIPUrl);
        const locationData = locationIpResponse.data;

        res.status(200).json(locationData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving data from API' });
    }
}