const loginService = require('./../../services/authenticate.service');

async function token(req, res, next) {
    try {
        const token = await loginService.authenticate(req.body);
        res.json(token);
    } catch (error) {
        next(error);
    }
};

async function refreshToken(req, res, next) {
    try {
        const refreshToken = await loginService.refreshToken(req.body);
        res.json(refreshToken);
    } catch (error) {
        next(error)
    }
};

module.exports = { token, refreshToken }