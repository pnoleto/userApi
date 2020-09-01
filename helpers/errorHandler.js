function errorHandler(err, req, res, next) {

    return res.status(err.status).json({ name: err.name, message: err.message });

    /*if (typeof (err) === 'string') {
        // custom application error      
        return res.status(400).json({ name: err.name, message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ name: err.name, message: 'Invalid WebToken or WebToken Expired' });
    }

    if (err.name === 'JsonWebTokenError') {
        // jwt authentication error
        return res.status(401).json({ name: err.name, message: 'Invalid WebToken signature' });
    }

    if (err.name === "InvalidCredential") {
        return res.status(401).json({ name: err.name, message: 'Username or password are incorrect' });
    }

    if (err.name === "Forbidden") {
        return res.status(403).json({ name: err.name, message: 'Forbidden' });
    }

    // default to 500 server error
    return res.status(500).json({ name: err.name, message: err.message });
    */
}

module.exports = errorHandler;