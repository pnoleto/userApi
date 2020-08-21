const loginService = require('./../../services/authenticate.service');

exports.authenticate = async (req, res, next) => {
    try {
        const token = await loginService.authenticate(req.body);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = await loginService.refreshToken(req.body);
        res.status(200).json(refreshToken);
    } catch (error) {
        next(error)
    }
};