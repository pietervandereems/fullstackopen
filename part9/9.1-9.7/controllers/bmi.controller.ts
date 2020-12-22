import express, { Request, Response } from 'express';
import { interpretBmi, parseBmiParams, calculateBmi } from '../libraries/bmiCalculator';

const bmiRouter = express.Router();

bmiRouter.get('/', ({ query }: Request, res: Response) => {
  const unneededHeight = <string>query.height;
  const unneededWeight = <string>query.weight;

  const { height, weight } = parseBmiParams(unneededHeight, unneededWeight);
  const bmi = interpretBmi(calculateBmi({ height, weight }));

  res.status(200).send({
    height,
    weight,
    bmi
  });
});

export {
  bmiRouter
};
