import express, { Request, Response } from 'express';
import { bmiRouter } from './controllers/bmi.controller';
import { errorHandler } from './utils/errorHandler';
const app = express();

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

const PORT = 3002;

app.use('/bmi', bmiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});