import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import spotifyRouter from './src/backend/spotify.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the Spotify route
app.use('/api', spotifyRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));