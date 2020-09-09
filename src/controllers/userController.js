const userService = require('../../services/user.service');
const rolesEnums = require('./../../enums/rolesEnum');

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
        throw { status: 412, name: 'PreconditionFailed', message: errMsg.toString() };
}

exports.get = async (req, res, next) => {
    try {
        socialId = req.query.socialId;
        username = req.query.username;
        email = req.query.email;
        skip = req.query.skip;
        take = req.query.take;

        const allUsers = await userService.getUsers({ socialId, username, email, skip, take })

        res.status(200).json({
            message: 'Lista de usuarios obtida com sucesso',
            source: allUsers.rows,
            totalCount: allUsers.rowCount
        });
    } catch (error) {
        next(error);
    }
};

exports.post = async (req, res, next) => {
    try {
        verifyUserProperties(req.body);

        const isAlreadyUser = (await userService.getUser(req.body.socialId)).id > 0;

        if (isAlreadyUser)
            throw { status: 409, name: 'Conflict', message: 'Usuario já cadastrado' };

        req.body.roles = [rolesEnums.user];

        const user = await userService.createUser(req.body);

        res.status(200).json({
            message: 'Usuario cadastrado com sucesso',
            source: user.rows,
            totalCount: user.rowCount
        });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    res.status(501).json({ name: 'Not implemented', message: 'Não implementado' });
};