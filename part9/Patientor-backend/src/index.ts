import express from 'express';
import { diagnosesRouter } from './routers/diagnoses.router';
import { patientsRouter } from './routers/patients.router';
import { pingRouter } from './routers/ping.router';
const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}\nMake sure to have proxy to port ${PORT} configured in the patientor frontend`);
});