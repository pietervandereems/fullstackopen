import express, { Request, Response } from 'express';
import { bmiRouter } from './controllers/bmi.controller';
import { exercisesRouter } from './controllers/exercises.controller';
import { errorHandler } from './utils/errorHandler';
const app = express();
app.use(express.json());

const PORT = 3002;

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.use('/bmi', bmiRouter);
app.use('/exercises', exercisesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});