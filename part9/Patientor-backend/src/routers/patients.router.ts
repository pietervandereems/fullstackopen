import express, { Request, Response } from 'express';
import patientsService from '../services/patients.service';

const patientsRouter = express.Router();

patientsRouter.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(patientsService.findPatientById(id));
});

patientsRouter.get('/', (_req: Request, res: Response) => {
  res.send(patientsService.getPatients());
});

patientsRouter.post('/', (req: Request, res: Response) => {
  res.send(patientsService.addPatient(req.body));
});

export {
  patientsRouter
};
