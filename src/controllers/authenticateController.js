const loginService = require('./../../services/authenticate.service');

exports.Authorize = async (req, res, next) => {
    try {
        const token = await loginService.authorize(req.body);
        res.json(token);
    } catch (error) {
        next(error);
    }
};

exports.RefreshToken = async (req, res, next) => {
    try {
        const refreshToken = await loginService.refreshToken(req.body);
        res.json(refreshToken);
    } catch (error) {
        next(error)
    }
};