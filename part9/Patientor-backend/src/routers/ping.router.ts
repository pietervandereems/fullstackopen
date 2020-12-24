import express, { Request, Response } from 'express';

const pingRouter = express.Router();

pingRouter.get('/', (_req: Request, res: Response) => {
  res.send('pong');
});

export {
  pingRouter
};
