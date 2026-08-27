import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/weather/data', (req: Request, res: Response) => {
  res.json({ message: "Musta?" });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));