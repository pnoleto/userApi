function errorHandler(err, req, res, next) {

    if (typeof (err) === 'string')
        return res.status(400).json({ name: err.name, message: err });

    if (err.status)
        return res.status(err.status).json({ name: err.name, message: err.message });

    return res.status(500).json({ name: err.name, message: err.message });
}

module.exports = errorHandler;