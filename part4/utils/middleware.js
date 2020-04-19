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

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  if (error.name === 'PasswordError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
};
