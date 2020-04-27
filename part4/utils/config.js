require('dotenv').config();
const logger = require('./logger');

const PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
let TESTINGMODE = false;

if (process.env.NODE_ENV === 'test') {
  logger.warn('\nTESTING Mode enabled\n');
  MONGODB_URI = process.env.TEST_MONGODB_URI;
  TESTINGMODE = true;
}

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  TESTINGMODE
};
