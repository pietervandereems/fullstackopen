import express, { Request, Response } from 'express';

const pingRouter = express.Router();

pingRouter.get('/', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});

export {
  pingRouter
};
