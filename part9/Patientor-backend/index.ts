import express from 'express';
import { pingRouter } from './controllers/ping.controller';
const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/ping', pingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});