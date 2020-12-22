import { NextFunction, Request, Response } from 'express';

const createError = ({ name, message }: Error): Error => {
  const err = new Error();
  err.name = name;
  err.message = message;
  return err;
};

const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction): Response<void> | void => {
  console.error('errorHandler', err);

  switch (err.name) {
    case 'ParamError':
      return res.status(400).send({ error: err.message });
    case 'MissingParameters':
      return res.status(400).send({ error: err.message });
  }

  return next(err);
};

export {
  createError,
  errorHandler
};
