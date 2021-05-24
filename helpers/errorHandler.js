const ExceptionResult = require("../domain/models/exceptionResult");

function errorHandler(err, req, res, next) {

     //if (typeof (err) === 'ExceptionResult')
     //   return res.status(err.status).json(err);

    return res.status(err.status).json(new ExceptionResult(err.status, err.name, err.message));
}

module.exports = errorHandler;