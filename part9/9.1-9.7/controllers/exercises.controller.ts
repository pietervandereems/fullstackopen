import express, { Request, Response } from 'express';
import { parseExercisesParams, calculateExercises } from '../libraries/exercises';

const exercisesRouter = express.Router();

exercisesRouter.post('/', ({ body }: Request, res: Response) => {
  res.status(200).send(calculateExercises(parseExercisesParams(body)));
});

export {
  exercisesRouter
};
