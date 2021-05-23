const ExceptionResult = require("../domain/models/exceptionResult");

function errorHandler(err, req, res, next) {

     if (typeof (err) === 'ExceptionResult')
        return res.status(err.status).json(err);

    return res.status(500).json(new ExceptionResult(500, err.name, err.message));
}

module.exports = errorHandler;