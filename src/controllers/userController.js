const ApiResult = require('../../domain/models/apiResult');
const rolesEnums = require('../../domain/enums/rolesEnum');
const userService = require('../../services/user.service');
const ExceptionResult = require('../../domain/models/exceptionResult');
const User = require('../../domain/models/user');

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

    if (errMsg.length > 0)
        throw new ExceptionResult(412, 'PreconditionFailed', errMsg.toString());
}

exports.List = async (req, res, next) => {
    try {
        socialId = req.query.socialId;
        username = req.query.username;
        email = req.query.email;
        skip = req.query.skip || 0;
        take = req.query.take || 10;

        const allUsers = await userService.getUsers({ socialId, username, email, skip, take });
        res.json(new ApiResult('Lista de usuarios obtida com sucesso', allUsers.rows, allUsers.rowCount));
    } catch (error) {
        next(error);
    }
};

exports.Insert = async (req, res, next) => {
    try {
        let userInfo = new User();
        userInfo.username = req.body.username;
        userInfo.photoUrl = req.body.photoUrl;
        userInfo.email = req.body.email;
        userInfo.roles = [rolesEnums.user];
        userInfo.socialId = req.body.socialId;
        userInfo.provider = req.body.provider;
        userInfo.insertedAt = new Date();
        userInfo.updatedAt = null;

        verifyUserProperties(userInfo);

        const isAlreadyUser = (await userService.getUser(userInfo.socialId)).id > 0;

        if (isAlreadyUser)
            throw new ExceptionResult(409, 'Conflict', 'Usuario já cadastrado');



        const user = await userService.createUser(userInfo);

        res.json(new ApiResult('Usuario cadastrado com sucesso', user, user.rowCount));
    } catch (error) {
        next(error);
    }
};

exports.Delete = async (req, res, next) => {
    try {
        throw new ExceptionResult(501, 'Not implemented', 'Não implementado');
    } catch (error) {
        next(error);
    }
};