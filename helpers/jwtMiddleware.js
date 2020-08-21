const expressJwt = require('express-jwt');
const { tokenOptions } = require('./../config.json');

function jwtMiddleware() {
    const { secret } = tokenOptions;
    return expressJwt({ secret })
        .unless({
            path: [
                // public routes that don't require authentication
                `/v1`,
                `/v1/users/token`,
                `/v1/users/refreshToken`
            ]
        });
}

module.exports = jwtMiddleware;