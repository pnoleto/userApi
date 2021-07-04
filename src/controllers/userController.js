const ExceptionResult = require('../../domain/models/exceptionResult');
const ApiResult = require('../../domain/models/apiResult');
const rolesEnums = require('../../domain/enums/rolesEnum');
const userService = require('../../services/user.service');
const User = require('../../domain/models/user');
const uservalidator = require('../../domain/validators/userValidator');

function verifyUserProperties({ socialId, username, email, photoUrl, provider }) {

    let userValidation = uservalidator.userValidator({ socialId, username, email, photoUrl, provider });

    if (userValidation.hasErrors())
        throw new ExceptionResult(412, 'PreconditionFailed', userValidation.getErrors());
}

exports.List = async (req, res, next) => {
    try {
        let socialId = req.query.socialId;
        let username = req.query.username;
        let email = req.query.email;
        let skip = req.query.skip || 0;
        let take = req.query.take || 10;

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
        let id = req.params.id;

        const deletedUser = await userService.deleteUser(id);
        res.json(new ApiResult('Usuario deletado com sucesso', [deletedUser], 1));
    } catch (error) {
        next(error);
    }
};