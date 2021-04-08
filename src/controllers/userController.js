const ApiResult = require('../models/apiResult');
const rolesEnums = require('./../../enums/rolesEnum');
const userService = require('../../services/user.service');
const ExceptionResult = require('../models/exceptionResult');

function verifyUserProperties(userInfo) {
    let errMsg = [];
    if (!userInfo.socialId)
        errMsg.push('Param socialId is invalid');

    if (!userInfo.username)
        errMsg.push('Param username is invalid');

    if (!userInfo.email)
        errMsg.push('Param email is invalid');

    if (!userInfo.photoUrl)
        errMsg.push('Param photoUrl is invalid');

    if (!userInfo.provider)
        errMsg.push('Param provider is invalid');

    if (errMsg.length)
        throw new ExceptionResult(412, 'PreconditionFailed', errMsg.toString());
}

exports.get = async (req, res, next) => {
    try {
        socialId = req.query.socialId;
        username = req.query.username;
        email = req.query.email;
        skip = req.query.skip;
        take = req.query.take;

        const allUsers = await userService.getUsers({ socialId, username, email, skip, take });
        res.json(new ApiResult('Lista de usuarios obtida com sucesso', allUsers.rows, allUsers.rowCount));
    } catch (error) {
        next(error);
    }
};

exports.post = async (req, res, next) => {
    try {
        verifyUserProperties(req.body);

        const isAlreadyUser = (await userService.getUser(req.body.socialId)).id > 0;

        if (isAlreadyUser)
            throw new ExceptionResult(409, 'Conflict', 'Usuario já cadastrado');


        req.body.roles = [rolesEnums.user];

        const user = await userService.createUser(req.body);
        res.json(new ApiResult('Usuario cadastrado com sucesso', user.rows, user.rowCount));
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        throw new ExceptionResult(501, 'Not implemented', 'Não implementado');
    } catch (error) {
        next(error);
    }
};