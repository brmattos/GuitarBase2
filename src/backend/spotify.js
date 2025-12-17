import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

router.get('/spotify-token', async (req, res) => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    const data = await response.json();
    res.json({ access_token: data.access_token });
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    res.status(500).json({ error: 'Failed to get Spotify token' });
  }
});

export default router;