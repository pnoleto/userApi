require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const config = JSON.parse(process.env.tokenOptions);


async function createToken(playLoad, tokenOptions) {

    const Token = jwt.sign(playLoad,
        tokenOptions.secret, {
        expiresIn: tokenOptions.expiresIn,
        algorithm: tokenOptions.algorithm,
        issuer: tokenOptions.issuer
    });

    return Token;
}

async function verifyToken(refreshToken, tokenOptions) {

    const decodedPlayLoad = jwt.verify(
        refreshToken,
        tokenOptions.secret, {
        issuer: tokenOptions.issuer
    });

    return decodedPlayLoad;
}

async function authorize({ socialId }) {
    try {
        if (!socialId)
            throw { status: 412, name: 'PreconditionFailed', message: 'Param socialId is invalid' };

        const user = await userService.getUser(socialId);

        if (user.id > 0) {
            const { password, ...userWithoutPassword } = user;

            const token = await createToken({ ...userWithoutPassword }, config.tokenOptions);

            const refreshToken = await createToken({ ...userWithoutPassword }, config.refreshTokenOptions);

            return { token, refreshToken };
        }

        throw { status: 401, name: 'InvalidCredential', message: 'Username or password are incorrect' };
    }
    catch (error) {
        throw { status: 500, name: error.name, message: error.message };
    }
}

async function refreshToken({ refreshToken }) {

    try {
        if (!refreshToken)
            throw { status: 412, name: 'PreconditionFailed', message: 'RefreshToken not found' };

        const decodedPlayload = await verifyToken(refreshToken, config.refreshTokenOptions);

        if (decodedPlayload) {
            const { password, iat, exp, iss, ...userWithoutPassword } = decodedPlayload;

            const token = await createToken({ ...userWithoutPassword }, config.tokenOptions);

            return { token };
        }

        throw { status: 401, name: 'UnauthorizedError', message: 'Invalid WebToken or WebToken Expired' };
    }
    catch (error) {
        throw { status: 500, name: error.name, message: error.message };
    }
}

module.exports = { authorize, refreshToken };