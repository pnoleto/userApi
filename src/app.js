const jwtMiddleWare = require('../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const errorHandler = require('../helpers/errorHandler');
const swaggerFile = require('../swagger_output.json');
const logger = require('../services/logger.service');
const usersRoute = require('./routes/usersRoute');
const { corsOptions } = require('../config.json');
const indexRoute = require('./routes/indexRoute');
const swaggerUi = require('swagger-ui-express');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(jwtMiddleWare());
//Rotas
app.use(`/v1/`, indexRoute);
app.use(`/v1/`, authRoute);
app.use(`/v1/users`, usersRoute);
app.use(`/v1/doc`, swaggerUi.serve, swaggerUi.setup(swaggerFile));
//O middlewere de log deve estar entre as rotas e o manipulador de erros.
app.use(logger);
//O middlewere de manipulação de erros deve ser sempre o ultimo.
app.use(errorHandler);

module.exports = app;