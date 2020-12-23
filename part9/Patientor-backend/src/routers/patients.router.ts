import express, { Request, Response } from 'express';
import patientsService from '../services/patients.service';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req: Request, res: Response) => {
  res.send(patientsService.getEntries());
});

export {
  patientsRouter
};
