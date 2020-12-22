const log = (...params: any) => {
  console.log(...params);
};

const info = (...params: any) => {
  console.info(...params);
};

const error = (...params: any) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

const warn = (...params: any) => {
  console.warn(...params);
};

export default {
  log,
  info,
  error,
  warn
};
