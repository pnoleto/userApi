const ExceptionResult = require("../src/models/exceptionResult");

function errorHandler(err, req, res, next) {

    if (typeof (err) === 'string')
        return res.status(400).json(err);

    if (err.status)
        return res.status(err.status).json(err);

    return res.status(500).json(new ExceptionResult(500, err.name, err.message));
}

module.exports = errorHandler;