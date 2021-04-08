require('dotenv').config();
const expressJwt = require('express-jwt');

const config = JSON.parse(process.env.tokenOptions);

function jwtMiddleware() {
    const { secret } = config.tokenOptions;
    return expressJwt({ secret })
        .unless({
            path: [
                // public routes that don't require authentication
                '/v1',
                '/v1/users/token',
                '/v1/users/refreshToken'
            ]
        });
}

module.exports = jwtMiddleware;