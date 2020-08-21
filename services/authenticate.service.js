const userService = require('../services/user.service');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

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

async function authenticate({ socialId }) {

    const user = await userService.getUser(socialId);

    if (user.id > 0) {
        const { password, ...userWithoutPassword } = user;

        const token = await createToken({ ...userWithoutPassword }, config.tokenOptions);

        const refreshToken = await createToken({ ...userWithoutPassword }, config.refreshTokenOptions);

        return { ...userWithoutPassword, token, refreshToken };
    }

    throw { name: 'InvalidCredential' };
}

async function refreshToken({ refreshToken }) {

    const decodedPlayload = await verifyToken(refreshToken, config.refreshTokenOptions);
    const user = await userService.getUser(decodedPlayload.socialId);

    if (user.id > 0) {

        const { password, ...userWithoutPassword } = user;

        const token = await createToken({ ...userWithoutPassword }, config.tokenOptions);

        return { ...userWithoutPassword, token };
    }

    throw { name: 'UnauthorizedError' };
}

module.exports = { authenticate, refreshToken };