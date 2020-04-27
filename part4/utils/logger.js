const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

const warn = (...params) => {
  console.warn(...params);
};

const fpLog = (text) => (param) => {
  console.log(text, param);
  return param;
};

module.exports = {
  info,
  error,
  warn,
  fpLog
};
