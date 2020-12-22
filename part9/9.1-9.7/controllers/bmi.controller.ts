import express, { Request, Response } from 'express';
import { interpretBmi, parseBmiParams, calculateBmi } from '../libraries/bmiCalculator';

const bmiRouter = express.Router();

bmiRouter.get('/', ({ query }: Request, res: Response) => {
  const { height, weight } = parseBmiParams(query);
  const bmi = interpretBmi(calculateBmi({ height, weight }));

  res.status(200).send({
    height,
    weight,
    bmi
  });
});

export {
  bmiRouter
}
