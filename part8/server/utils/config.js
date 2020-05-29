require('dotenv').config();
const logger = require('./logger');

let MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
let TESTINGMODE = false;

if (process.env.NODE_ENV === 'test') {
  logger.warn('\nTESTING Mode enabled\n');
  MONGODB_URI = process.env.TEST_MONGODB_URI;
  TESTINGMODE = true;
}

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
  TESTINGMODE
};
