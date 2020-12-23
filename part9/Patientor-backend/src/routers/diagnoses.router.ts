import express, { Request, Response } from 'express';
import diagnosesService from '../services/diagnoses.service';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req: Request, res: Response) => {
  res.send(diagnosesService.getEntries());
});

export {
  diagnosesRouter
};
