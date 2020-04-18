const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

const fpLog = (text) => (param) => {
  console.log(text, param);
  return param;
};

module.exports = {
  info,
  error,
  fpLog
};
