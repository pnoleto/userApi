const jwtMiddleWare = require('../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const errorHandler = require('../helpers/errorHandler');
const logger = require('../services/logger.service');
const { corsOptions } = require('../config.json');
const compression = require('compression');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(jwtMiddleWare());
//Rotas
app.use(`/v1`, index);
app.use(`/v1/users`, authRoute);
//O middlewere de log deve estar entre as rotas e o manipulador de erros.
app.use(logger);
//O middlewere de manipulação de erros deve ser sempre o ultimo.
app.use(errorHandler);

module.exports = app;