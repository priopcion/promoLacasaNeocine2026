const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});
module.exports = createLogger({
  format: combine(
    format.colorize(),
    format.simple(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      level: "debug",
    }),
  ],
});
