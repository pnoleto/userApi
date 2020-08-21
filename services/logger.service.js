const { loggerOptions } = require('../config.json');
const expressWinston = require('express-winston');
const winston = require('winston');

const loggerInstance = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.colorize(),
    ),
    requestWhitelist: loggerOptions.requestWhitelist,
    blacklistedMetaFields: loggerOptions.requestBlacklist
});

module.exports = loggerInstance;