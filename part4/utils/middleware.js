const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error('errorHandler', error);

  if (error.name === 'CastError' &&
    (error.kind === 'ObjectId' || error.message.substring(0, 16) === 'Cast to ObjectId')) {
    return response.status(400).send({ error: 'malformatted id' });
  }

  switch (error.name) {
  case 'ValidationError':
    return response.status(400).send({ error: error.message });
  case 'PasswordError':
    return response.status(400).send({ error: error.message });
  case 'TokenError':
    return response.status(401).send({ error: error.message });
  case 'JsonWebTokenError':
    return response.status(401).json({ error: 'invalid token' });
  case 'UnauthorizedUser':
    return response.status(403).send({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.headers.authorization;

  request.token = null;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
