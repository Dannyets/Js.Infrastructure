import winston from 'winston';

function createLoggerOptions(name?: string) {
  const options = {
    transports: [
      new winston.transports.Console(),
    ],
    format: alignedWithColorsAndTime,
    defaultMeta: {
      name,
    },
  };

  if (name) {
    options.defaultMeta = {
      name,
    };
  }

  return options;
}

const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...args } = info;

    const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
  }),
);

export default {
  createLoggerOptions,
  alignedWithColorsAndTime,
};
