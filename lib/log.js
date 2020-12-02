import winston from "winston";
const config = require("./config");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json()
});

if (config.ENV === "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
} else {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json()
    })
  );
}

module.exports = logger;
