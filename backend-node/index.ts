import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const OPENWEATHER_APP_ID = process.env.OPENWEATHER_APP_ID;

if (!OPENWEATHER_APP_ID) {
  throw new Error('OPENWEATHER_APP_ID is not configured');
}

app.use(cors({
  origin: ['https://onrender.com', 'http://localhost:5173'] 
}));
app.use(express.json());

app.get('/api/node/current-weather', async (req: Request, res: Response) => {
  const { lat, long } = req.query;

  if(typeof lat !== 'string' || typeof long !== 'string') {
    return res.status(400).json({ error: 'lat and long are required for this request' });
  }
  
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${OPENWEATHER_APP_ID}`);

  const data = await response.json();
  res.status(response.status).json(data);
});

app.get('/api/node/geo-direct', async (req: Request, res: Response) => {
  const { city, state, country } = req.query;

  if(typeof city !== 'string') {
    return res.status(400).json({ error: 'city is required for this request' });
  }
  
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit={limit}&&appid=${OPENWEATHER_APP_ID}`);

  const data = await response.json();
  res.status(response.status).json(data);
});

app.get('/api/node/geo-reverse', async (req: Request, res: Response) => {
  const { lat, long, limit } = req.query;

  if(typeof lat !== 'string' || typeof long !== 'string') {
    return res.status(400).json({ error: 'lat and long are required for this request' });
  }
  
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=${limit}&appid=${OPENWEATHER_APP_ID}`);

  const data = await response.json();
  res.status(response.status).json(data);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));