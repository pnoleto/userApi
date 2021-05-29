const loginService = require('./../../services/authenticate.service');

exports.Authorize = async (req, res, next) => {
    try {
        const token = await loginService.authorize({ socialId: req.body.socialId });
        res.json(token);
    } catch (error) {
        next(error);
    }
};

exports.RefreshToken = async (req, res, next) => {
    try {
        const refreshToken = await loginService.refreshToken({ refreshToken: req.body.refreshToken });
        res.json(refreshToken);
    } catch (error) {
        next(error)
    }
};