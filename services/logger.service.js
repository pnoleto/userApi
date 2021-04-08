const winston = require('winston');
const expressWinston = require('express-winston');
const { loggerOptions } = require('../config.json');

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
    responseWhitelist: loggerOptions.responseWhitelist,
    blacklistedMetaFields: loggerOptions.blackFieldsBlacklist,
    statusLevels: loggerOptions.statusLevels
});

module.exports = loggerInstance;